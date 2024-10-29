<template>
  <div class="policy">
    <div style="display: flex;margin-left: 100px">
      <el-button
          style="margin-left: 1000px"
          type="primary"
          @click="getTable"
      >
        Refresh
      </el-button>
    </div>
    <el-table :data="state.tableData" height="550" style="width: 100%">
      <el-table-column label="id" prop="id" width="220"/>
      <el-table-column label="Holder" prop="holderBid" width="350"/>
      <el-table-column label="Verification Status" prop="statu" width="220"/>
      <el-table-column label="Application Date" prop="created_time" width="220"/>
      <!-- <el-table-column label="理由" prop="resource" width="120" /> -->
      <el-table-column label="Action" min-width="130">
        <template #default="scope">
          <el-button v-if="scope.row.status === 0" type="primary" @click="showVC(scope.row)">
            Deploy
          </el-button>
          <el-button v-if="scope.row.status === 0" type="primary" @click="verCrenditial(scope.row)">
            Verify
          </el-button>
          <!-- <el-button  type="danger" @click="openVerDialog(scope.row)">
            不通过
        </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="state.verDialogVisible"
        :before-close="handleClose"
        title="Tips"
        width="780"
    >
      <div style="display: flex;">
        <div>
          <div class="title" style="text-align: center">Salted Hash of Credential Claims</div>
          <div>
            <el-input
                v-model="state.showVcData"
                :rows="7"
                placeholder="Please input"
                style="width: 720px"
                type="textarea"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="showtips()">
            Deploy
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script name="policyIndex" setup>
import {onMounted, reactive} from 'vue'
import {verupdatecredentialList, vergetcredentialList} from '/@/api/login/login-form'
import {ElMessage} from "element-plus";
import CryptoJS from 'crypto-js';
import * as snarkjs from "snarkjs";
import axios from "axios";



const state = reactive({
  verDialogVisible: false,
  showVcData: '',
  tableData: [
    {
      id: 1,
      bid: 'did:bid:efnLDXexDs1TsSZdtRmrrKHW3kFvoyFN',
      type: '个人',
      time: '2024-09-01 12:00:00',
      status: 0,
      resource: '申请单1',
    }
  ]
})
onMounted(() => {
  getTable();
})
const showtips = () => {
  ElMessage({
    message: 'Deployed to TEE container at http://localhost:7001/verCredential/tee/containers',
    type: 'success',
  })
}
const getTable = async () => {
  const res = await vergetcredentialList({})
  res.data.forEach((item) => {
    item.created_time = formDate(item.created_time)
    item.statu = item.status === 0 ? 'Verifying' : 'Verified'
  })
  state.tableData = res.data
}
const showVC = (vc) => {
  console.log(JSON.parse(vc.vc))
  let vcData = JSON.parse(vc.vc).credentialSubject
  for (let vcElement in vcData) {
    if (vcElement !== 'id') {
      let val = vcData[vcElement]
      const wordArray = CryptoJS.lib.WordArray.create(val);
      const hash = CryptoJS.SHA256(wordArray).toString();
      vcData[vcElement] = hash
    }
    console.log('vcData', vcData);
  }
  console.log('vcData', vcData);
  let formData1 = JSON.stringify(vcData, null, 2);
  state.showVcData = formData1
  state.verDialogVisible = true
}

const formDate = (propsDate) => {
  const date = new Date(propsDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}.${month}.${day}  ${hours}:${minutes}:${seconds}`;
}
//verify
const verCrenditial = async (row) => {
  axios.get("verification_key.json", {}).then(async response => {
    const {proof, publicSignals} = await snarkjs.plonk.fullProve(
        {a: 1, b: 18},
        "../../circuit.wasm",
        "../../circuit_final.zkey"
    );
    const attestation = await snarkjs.plonk.verify(response.data, [ '18' ], proof);
    if (attestation === true) {
      console.log("Verification OK");
      const params = {
        id: row.id,
        holderBid: row.holderBid,
        vc: row.vc,
        status: 1,
        agentid: row.agentid
      };
      const res = await verupdatecredentialList(params);
    }
  })

  ElMessage({
    message: 'Verification Successful',
    type: 'success',
  })
  getTable();
}


</script>

<style lang="scss" scoped>
@import '/@/assets/scss/mixins/index.scss';


//.dialog-contain {
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//  justify-content: center;
//}


.policy {
  margin: 20px;
  position: relative;


  .affix--fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    font-size: 30px;
  }

  .wrap {
    position: relative;
    z-index: 1;
  }

  .policy-list {
    padding: 20px 0 53px;

    li {
      padding: 30px 0 28px;
      border-bottom: 1px solid rgba(151, 151, 151, 0.2);

      a {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      .item-img {
        width: 170px;
        height: 125px;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .item-info {
        width: calc(100% - 210px);
        padding-top: 6px;

        .info-title {
          font-weight: 500;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
        }

        .info-desc {
          font-weight: 400;
          font-size: 14px;
          color: #6D7280;
          line-height: 20px;
          padding: 14px 0 20px;
          height: 74px;
          @include text-ellipsis(2);
        }

        .info-meta {
          span {
            font-weight: 400;
            font-size: 12px;
            color: #6D7280;
            line-height: 17px;

            &:nth-child(1) {
              margin-right: 162px;
            }
          }
        }
      }
    }
  }
}
</style>
