<template>
  <div class="policy">
    <div style="display: flex;margin-left: 100px">
      <el-button
          style="margin-left: 1000px"
          type="primary"
          @click="selTableData"
      >
        Refresh
      </el-button>
      <el-button

          type="primary"
          @click="openCreateVerIdential"
      >
        Apply for Credential
      </el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">
              @context: {{ props.row.vc.vc['@context'] }}
            </p>
            <p m="t-0 b-2">type: {{ props.row.vc.vc['type'] }}</p>
            <p m="t-0 b-2">
              Credential Type:
              {{
                props.row.vc.vc['credentialSubject']
                    .credentialType
              }}
            </p>
            <p
                v-for="item in props.row.vc.vc['credentialSubject']
                                .cerTemplateSubjectData"
                :key="item.name"
                m="t-0 b-2"
            >
              {{ item.name }}:{{ item.value }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id" width="120"/>
      <el-table-column
          label="Credential Type"
          prop="credentialName"
          width="120"
      />
      <el-table-column
          label="Application Date"
          prop="issuanceDate"
          width="220"
      />
      <el-table-column label="Issuer" prop="creBid" width="220"/>
      <el-table-column label="Application Status" prop="statu" width="220"/>
      <el-table-column label="Verification Status" prop="ver_statu" width="220"/>
      <el-table-column label="Action" min-width="130">
        <template #default="scope">
          <el-button size="large" v-if="scope.row.iss_status == 1" @click="openVerDialog(scope.row)">
            Verify
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--        <el-button class="affix&#45;&#45;fixed" type="primary" @click="openCreateVerIdential">申请凭证</el-button>-->
    <!--    验证凭证弹窗-->
    <el-dialog
        v-model="state.verDialogVisible"
        :before-close="handleClose"
        title="Tips"
        width="1080"
    >
      <div style="display: flex;">
        <div>
          <div class="title" style="text-align: center">Verifiable Credential</div>
          <div>
            <el-input
                v-model="state.showVcData"
                :rows="16"
                placeholder="Please input"
                style="width: 520px"
                type="textarea"
            />
          </div>
        </div>
        <div>
          <div class="title" style="text-align: center">Selective Disclosure Verifiable Credential</div>
          <div>
            <el-input
                v-model="state.showVcDataHash"
                :rows="16"
                placeholder="Please input"
                style="width: 520px"
                type="textarea"
            />
          </div>
        </div>
      </div>
      <div style="margin-top: 10px">
        <div style="margin-bottom: 10px;display: flex">
          <div style="width:100px;margin-top: 7px;margin-left: 530px">Issuer Address:</div>
          <el-input
              v-model="state.verifyAddress"
              placeholder=""
              style="width: 240px"
          />
          <el-button style="margin-left: 100px;" type="primary" @click="verVerIdential()">
            Verify
          </el-button>
        </div>
        <div style="margin-bottom: 10px;display: flex">
          <div style="width:100px;margin-top: 5px">Selective Disclosure:</div>
          <el-select
              v-model="state.credentialType"
              placeholder="Select"
              size="large"
              style="width: 240px"
          >
            <el-option
                key="0"
                label="Name"
                value="0"
            />
            <el-option
                key="1"
                label="Gender"
                value="1"
            />
            <el-option
                key="2"
                label="Age"
                value="2"
            />
          </el-select>
          <div style="width:100px;margin-left: 80px;margin-top: 7px">TEE Container Address:</div>
          <el-input
              v-model="state.containerTeeAddress"
              placeholder=""
              style="width: 350px"
          />
          <el-button style="margin-left: 100px;" type="primary" @click="tips()">
            Attest
          </el-button>
        </div>

      </div>
      <!-- <template #footer>
          <div class="dialog-footer">
              <el-button type="primary" @click="verVerIdential()">
                  验证
              </el-button>
          </div>
      </template> -->
    </el-dialog>
    <!--    申请凭证弹窗-->
    <el-dialog
        v-model="state.creDialogVisible"
        :before-close="crehandleClose"
        title="Tips"
        width="780"
    >
      <div class="dialog-contain">
        <div>
          Credential Type：
          <el-select
              v-model="state.credentialType"
              placeholder="Select"
              size="large"
              style="width: 240px"
          >
            <el-option
                key="0"
                label="Zero-Knowledge Proofs"
                value="0"
            />
            <el-option
                key="1"
                label="Original"
                value="1"
            />
          </el-select>
        </div>
        <el-form
            ref="ruleFormRef"
            :model="state.credentialFormData"
            class="demo-ruleForm"
            label-width="auto"
            status-icon
            style="max-width: 600px; margin-top: 20px"
        >
          <el-form-item
              v-for="item in state.cerTemplateSubjectData"
              :key="item.id"
              :label="item.name"
              prop="pass"
          >
            <el-input
                v-if="item.type === 'input'"
                v-model="item.value"
                style="width: 240px"
            />
            <el-input
                v-if="item.type === 'select'"
                v-model="item.value"
                style="width: 240px"
            />
          </el-form-item>
        </el-form>
        <div>
          Issuer Address:
          <el-input
              v-model="state.credentialAddress"
              placeholder=""
              style="width: 350px"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="createVerIdential()">
            Apply
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" name="policyIndex" setup>
import {onMounted, reactive, watchEffect} from 'vue'
import {
  getCertificateTemplateApi,
} from '/@/api/login/login-form'
import {ElMessage} from 'element-plus'
import {Buffer} from 'buffer'
import axios from 'axios'
import CryptoJS from 'crypto-js'


const state = reactive({
  test: [],
  containerAddress:"",
  // 审核状态字典
  statusObj: {
    '0': 'Under Review',
    '1': 'Approved',
    '2': '审核拒绝'
  },
  // 凭证模版主图数据
  cerTemplateSubjectData: [],
  // 凭证模版选择数据
  cerTemplateSelectData: [],
  // 凭证模版类型选择值
  credentialType: '',
  // 凭证模版form值
  credentialFormData: {
    name: '',
    phone: ''
  },
  // VC
  showVcData: '',
  showVcDataHash:'',
  // 创建凭证弹框
  creDialogVisible: false,
  // 验证凭证弹框
  verDialogVisible: false,
  tableData: [],
  // 验证方bid
  verBid: '',
  // 验证结果
  verResult: '',
  // 发证方地址
  credentialAddress: 'http://localhost:7001/createCredential',
  // 验证方地址
  verifyAddress: 'http://localhost:7001/verCredential',
  containerTeeAddress: 'http://localhost:7001/verCredential/tee/containers',
  id: ""
})

/**
 * 打开验证证书弹框
 */
const openVerDialog = (vc: any) => {
  state.verDialogVisible = true
  console.log('vc.certificate_vc', vc.certificate_vc.credentialSubject)
  let vcleftData = JSON.parse(JSON.stringify(vc.certificate_vc));
  let formDataleft = JSON.stringify(vcleftData,null,2);
  state.showVcData = formDataleft

  let vcDataright = JSON.parse(JSON.stringify(vc.certificate_vc))
  let vcData = vcDataright.credentialSubject;
  for (let vcElement in  vcData) {
    if(vcElement !== 'id'){
      let val = vcData[vcElement]
      const wordArray = CryptoJS.lib.WordArray.create(val);
      const hash = CryptoJS.SHA256(wordArray).toString();
      console.log('hash',hash)
      vcData[vcElement] = hash
    }
    console.log('vcData', vcData);
  }
  // vc.certificate_vcJson = JSON.parse(vc.certificate_vc);
  let formData = JSON.stringify(vcDataright,null,2);
  state.showVcDataHash = formData;
  // const wordArray = CryptoJS.lib.WordArray.create(this.jsonData);
  // const hash = CryptoJS.SHA256(wordArray).toString();
  //123
  state.id = vc.id;
}

/**
 * 关闭验证证书弹框
 */
const handleClose = () => {
  state.verDialogVisible = false
  state.verResult = ''
  state.verBid = ''
}

/**
 * 关闭申请凭证弹框
 */
const crehandleClose = () => {
  // 清除申请凭证dialog 数据
  state.cerTemplateSubjectData = []
  state.credentialType = ''
  state.creDialogVisible = false
}

const tips = () => {
  ElMessage({
    message: 'Selective Disclosure of Claims to TEE Container',
    type: 'success'
  })
}

/**
 * 验证证书
 * @param vc
 */
const verVerIdential = async (row) => {
  let obj = {message: state.showVcData}
  let bifwallet = window.bifWallet
  // VC 签名
  bifwallet.signMessage(obj, async (res: any) => {
    // let verifyResult = await verVerIdentialApi(res.data);
    res.data.verid = state.id;
    let verifyResult = await axios.post(
        state.verifyAddress,
        res.data
    )
    if (verifyResult.data.code === 200) {
      ElMessage({
        message: 'Send Presentation Successful',
        type: 'success'
      })
      state.verResult = verifyResult.data.data.verified
      state.verBid = verifyResult.data.data.verBid
      handleClose();
    } else {
      ElMessage({
        message: verifyResult.data.error.message,
        type: 'error'
      })
    }
  })
}

/**
 * 打开生成凭证弹框
 */
const openCreateVerIdential = () => {
  state.creDialogVisible = true;
}

/**
 * 生成可验证证书
 */
const createVerIdential = async () => {
  let data = JSON.parse(localStorage.getItem('userInfo'))
  // 凭证主体 数据组装
  let credentialSubject = {
    credentialType: state.credentialType,
    cerTemplateSubjectData: state.cerTemplateSubjectData
  }
  let apiData = {
    bid: data.bid,
    credentialSubject: JSON.stringify(credentialSubject),
    publicKey: data.publicKey
  }
  let obj = {message: JSON.stringify(apiData)}
  let bifwallet = window.bifWallet
  // VC 签名
  bifwallet.signMessage(obj, async (res1: any) => {
    console.log('res1', res1)
    // res1.data.verid = data.bid;
    // let res = await createVerIdentialApi(res1.data);
    let {data: res} = await axios.post(
        state.credentialAddress,
        res1.data
    )
    console.log('res: ', res);
    if (res.code === 200) {
      selTableData()
      ElMessage({
        message: 'Application Successful',
        type: 'success'
      })
      crehandleClose()
      // // 轮训查询申请凭证状态
      // let intervalId = setInterval(selTableData, 1000);
      // setTimeout(() => {
      //   clearInterval(intervalId);
      // }, 6000)
    } else {
      ElMessage({
        message: res.data.error.message,
        type: 'error'
      })
    }
  })
}

/**
 *更新表格数据
 */
const selTableData = async () => {
  // let res = await findAgentCredentialBybidApi({})
  let {data: res} = await axios.post(
      'http://localhost:7001/findAgentCredentialBybid',
      {}
  )
  let verObj = {
    0: '未核验',
    1: 'Verified',
  }
  if (res.code == 200) {
    for (const item of res.data) {
      item.statu = state.statusObj[item.iss_status] || 'Under Review'
      item.ver_statu = verObj[item.ver_status] || 'Verifying'
      item.certificate_vc = JSON.parse(item.certificate_vc)
      item.credentialName =
          'Zero-Knowledge Proofs'
      item.issuanceDate = formDate(item.created_time)
      item.creBid = item.credential_bid
      item.vc = item?.certificate_vc?.proof?.jwt
          ? decodeJwtPayload(item.certificate_vc.proof?.jwt)
          : ''
    }
    console.log('res.data', res.data);

    state.tableData = res.data
    // state.tableData.push(res.data[20,21])
  }
}

/**
 * 获取凭证模版列表
 */
const getCertificateTemplateData = async () => {
  let res = await getCertificateTemplateApi({})
  console.log('res', res)
  if (res.code === 200) {
    state.cerTemplateSelectData = res.data
  }
}

/**
 * 格式化时间
 * @param propsDate
 */
const formDate = (propsDate: any) => {
  const date = new Date(propsDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}.${month}.${day}  ${hours}:${minutes}:${seconds}`;
}

/**
 * jwt 解密
 */
function decodeJwtPayload(jwt) {
  // 分割 JWT 字符串
  const parts = jwt.split('.')
  // 解码 Payload
  const payload = Buffer.from(parts[1], 'base64').toString('utf-8')
  // 将 JSON 字符串转换为 JavaScript 对象
  const payloadObj = JSON.parse(payload)
  return payloadObj
}

watchEffect(() => {
  //监听凭证模版选择值
  state.cerTemplateSelectData.forEach((item) => {
    console.log('item.templateSubject: ', item.templateSubject)
    if (item.templateName === state.credentialType) {
      state.cerTemplateSubjectData = JSON.parse(item.templateSubject)
      console.log(
          'state.cerTemplateSubjectData: ',
          state.cerTemplateSubjectData
      )
    }
  })
})
onMounted(() => {
  getCertificateTemplateData()
  selTableData()
})
// selTableData()
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

  &::before {
    content: '';
    width: 100%;
    height: 300px;
    background: linear-gradient(180deg, #f1f7ff 0%, #ffffff 100%);
    opacity: 0.8;
    @include abs(150px, auto, auto, 0);
  }

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
          color: #6d7280;
          line-height: 20px;
          padding: 14px 0 20px;
          height: 74px;
          @include text-ellipsis(2);
        }

        .info-meta {
          span {
            font-weight: 400;
            font-size: 12px;
            color: #6d7280;
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
