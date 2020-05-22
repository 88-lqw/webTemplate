<template>
  <Row :gutter="32">
    <Col span="24">
      <Form method="post">
        <Form-item>
          <Form inline>
            <Form-item>
              <Input
                class="search_item"
                type="text"
                v-model="searchList.searchCondition.msgTitle"
                clearable
                placeholder="信息标题"
              ></Input>
            </Form-item>
            <Form-item>
              <Button style="margin-right:10px" @click="searchPageReturn">
                <Icon size="18" type="ios-search" />
              </Button>
              <Button icon="md-add" @click="showAdd()">增加</Button>
            </Form-item>
            <Modal
              :mask-closable="false"
              width="400"
              v-model="viewData.modalDelete"
              @on-ok="onDeleteBtn"
            >
              确认删除id为：
              <span style="color:red">{{viewData.Delete.msgId}}</span>
              的信息吗？
            </Modal>
            <Modal
              v-model="viewData.modalAdd"
              title="添加信息"
              :mask-closable="false"
              @on-ok="onAddBtn"
              width="35"
              @on-cancel="onModelCancel"
            >
              <Form :label-width="80">
                <Form-item class="form_item" label="信息标题:">
                  <Input
                    style="width: 200px"
                    v-model="viewData.Add.msgTitle"
                    type="text"
                    placeholder="请输入标题"
                  ></Input>
                </Form-item>
                <Form-item class="form_item" label="信息正文:">
                  <Input
                    style="width: 200px"
                    v-model="viewData.Add.msgContent"
                    type="text"
                    placeholder="请输入信息正文"
                  ></Input>
                </Form-item>
              </Form>
            </Modal>
            <Modal
              v-model="viewData.modalEdit"
              title="编辑信息"
              :mask-closable="false"
              @on-ok="onEditBtn"
              width="35"
              @on-cancel="onModelCancel"
            >
              <Form :label-width="80">
                <Form-item class="form_item" label="信息标题:">
                  <Input
                    style="width: 200px"
                    v-model="viewData.Edit.msgTitle"
                    type="text"
                    placeholder="请输入正整数"
                  ></Input>
                </Form-item>
                <Form-item class="form_item" label="信息正文:">
                  <Input
                    style="width: 200px"
                    v-model="viewData.Edit.msgContent"
                    type="text"
                    placeholder="请输入信息正文"
                  ></Input>
                </Form-item>
              </Form>
            </Modal>
            <Modal title="查看订单详情" width="55" :styles="{top: '70px'}" v-model="viewData.modalDetail">
            <div class="order_info">
              <h2>{{viewData.introduction.DetailIntroduction.remark}}</h2>
              <Row>
                <Col span="20" offset="1">{{viewData.introduction.DetailIntroduction.content}}</Col>
              </Row>
              <h2>{{viewData.introduction.DetailIntroduction1.remark }}</h2>
              <Row>
                <Col span="20" offset="1">{{viewData.introduction.DetailIntroduction1.content }}</Col>
              </Row>
              <Row>
                <Col span="10" offset="1"><span style="font-size:15px;">{{viewData.Detail.goodsStandard}}</span></Col>
              </Row>
              <Row>
                <Col span="10">箱规:{{viewData.Detail.goodsSize}}</Col>
                <Col span="10">箱重: {{viewData.Detail.goodsWeight}}</Col>
              </Row>
              <Row>
                <Col span="10">包装规格:{{viewData.Detail.goodsBzgg}}</Col>
                <Col span="10">净重: {{viewData.Detail.goodsSuttle}}</Col>
              </Row>
              <Row>
                <Col span="10">产地: {{viewData.Detail.goodsOrigin}}</Col>
                <Col span="10">发货地: {{viewData.Detail.goodsFhdd}}</Col>
              </Row>
              <Row>
                <Col span="10">发布人: {{viewData.Detail.nickName}}</Col>
                <Col span="10">联系电话: {{viewData.Detail.contactNumber}}</Col>
              </Row>
              <Row>
                <Col span="10">微信号: {{viewData.Detail.contactWechat}}</Col>
                <Col span="10">发布时间: {{viewData.Detail.createTime}}</Col>
              </Row>
              <!-- <h4>发布时间: {{viewData.Detail.createTime}}</h4> -->
              <!-- 商品信息 -->
              <h3>商品图</h3>
              <Row>
                <Col span="4">商品封面图:</Col>
                <Col span="18">
                <img :src="viewData.Detail.imageSrc" class="img_item" preview="0" preview-text="商品封面图" />
                </Col>
              </Row>
              <Row>
                <Col span="4">商品图:</Col>
                <Col span="18">
                <img v-for="(item,index) in viewData.Detail.goodsGallery" :key="index" :src="item" class="img_item"
                  preview="1" preview-text="商品图" />
                </Col>
              </Row>
              <Row>
                <Col span="4">营业执照:</Col>
                <Col span="4">
                <img :src="viewData.Detail.businessLicense" class="img_item" preview="2" preview-text="商品封面图" />
                </Col>
                <Col span="4">医疗器械注册证:</Col>
                <Col span="4">
                <img :src="viewData.Detail.ylqxLicense" class="img_item" preview="3" preview-text="商品封面图" />
                </Col>
              </Row>
              <Row>
                <Col span="4">CE证书:</Col>
                <Col span="4">
                <img :src="viewData.Detail.ceLicense" class="img_item" preview="4" preview-text="商品封面图" />
                </Col>
                <Col span="4">FDA证书:</Col>
                <Col span="4">
                <img :src="viewData.Detail.fdaLicense" class="img_item" preview="5" preview-text="商品封面图" />
                </Col>
              </Row>
              <Row>
                <Col span="4">检测报告:</Col>
                <Col span="18">
                <img v-for="(item,index) in viewData.Detail.examiningReport" :key="index" :src="item" class="img_item"
                  preview="6" preview-text="商品图" />
                </Col>
              </Row>
              <!-- 用户信息 -->
              <h3>商品认证</h3>是否通过认证：
              <Switch :value="viewData.Detail.isAuthentication===1"  size="large">
                <span slot="open">通过</span>
                <span slot="close">暂不</span>
              </Switch>
            </div>
          </Modal>
          </Form>
          <Form-item style="padding-top: 10px;">
            <i-table border :columns="searchList.columns" :data="searchList.pageData.content"></i-table>
            <Page
              style="padding-top: 10px"
              :total="searchList.pageData.total"
              :current="searchList.pageData.pageNum"
              :page-size="10"
              @on-change="onPageChange"
              size="small"
              show-total
            ></Page>
          </Form-item>
        </Form-item>
      </Form>
    </Col>
  </Row>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      fileName: '',
      uploadFile: {},
      searchList: {
        Info: [],
        columns: [
          {
            title: 'id',
            align: 'center',
            key: 'id',
            width: 100
          },
          {
            title: '国家',
            align: 'center',
            key: 'country'
          },
          {
            title: '关于我们',
            align: 'center',
            key: 'configure',
            render:(h,params)=>{
              return h('span',params.row.configure[1].remark)
            }
          },
          {
            title: '清控科创控股',
            align: 'center',
            key: 'frameWork',
            render:(h,params)=>{
              return h('span',params.row.introduction[1].remark)
            }
          },
          {
            title: '公司框架结构',
            align: 'center',
            key: 'createTime',
            render:(h,params)=>{
              return h('span',params.row.configure[6].remark)
            }
          },
          {
            title: '业务模板',
            align: 'center',
            key: 'technology',
            render:(h,params)=>{
             return h('span',params.row.configure[2].remark)
            }
          },
          {
            title: '人才招聘',
            align: 'center',
            key: 'createTime',
            render:(h,params)=>{
             return h('span',params.row.configure[3].remark)
            }
          },
           {
            title: '联系我们',
            align: 'center',
            key: 'createTime',
            render:(h,params)=>{
             return h('span',params.row.configure[4].remark)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '15px'
                    },
                    on: {
                      click: () => {
                        this.showEdit(params.row)
                      }
                    }
                  },
                  '编辑'
                ),
                 h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '15px'
                    },
                    on: {
                      click: () => {
                        this.showDetail(params.row)
                      }
                    }
                  },
                  '详情'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '15px'
                    },
                    on: {
                      click: () => {
                        this.showDelete(params.row)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        ],
        data: [],
        pageData: {
          content: [],
          pageNum: 1,
          total: 0
        },
        searchCondition: {
          page: 1,
          size: 5
        },
        pageSizeOpts: [1, 5, 10, 20, 30, 40]
      },
      viewData: {
        Add: {
          categoryName: '',
          listorder: ''
        },
        Edit: {
          categoryName: '',
          listorder: ''
        },
        Delete: {},
        Detail:'',
        DetailConfigure:'',
        DetailFrameWork:'',
        introduction:{
          DetailIntroduction:'',
          DetailIntroduction1:'',
          DetailIntroduction2:'',
          DetailIntroduction3:'',
          DetailIntroduction4:'',
          DetailIntroduction5:'',
        },
        DetailRecruit:'',
        DetailTechnology:'',
        modalEdit: false,
        modalAdd: false,
        modalDelete: false,
        modalDetail: false,
        Confirm: ''
      }
    }
  },
  methods: {
    onDeleteBtn() {
      axios
        .delete('/api/message/delete', {
          data: {
            msgId: this.viewData.Delete.msgId
          }
        })
        .then(response => {
          this.$Message.success('删除成功!')
          this.searchManage()
        })
    },
    onAddBtn() {
      this.$Message.warning('上传中，请稍后...')
      axios
        .post(
          '/api/message/create',
          stringify({
            msgContent: this.viewData.Add.msgContent,
            msgTitle: this.viewData.Add.msgTitle
          })
        )
        .then(response => {
          this.viewData.Add = {}
          this.searchManage()
          this.$Message.success('添加成功!')
        })
    },
    onEditBtn() {
      this.$Message.warning('上传中，请稍后...')
      axios
        .put(
          '/api/message/update',
          qs.stringify({
            msgId: this.viewData.Edit.msgId,
            msgContent: this.viewData.Edit.msgContent,
            msgTitle: this.viewData.Edit.msgTitle
          })
        )
        .then(response => {
          this.viewData.Edit = {}
          this.searchManage()
          this.$Message.success('编辑成功!')
        })
        .catch(() => {
          this.searchManage()
        })
    },
    onModelCancel() {
      this.searchManage()
    },
    showAdd() {
      this.viewData.modalAdd = true
    },
    showEdit(item) {
      this.viewData.Edit = item
      this.viewData.modalEdit = true
    },
    showDelete(item) {
      this.viewData.Delete = item
      this.viewData.modalDelete = true
    },
     showDetail(row) {
        this.viewData.modalDetail = true
        this.viewData.Detail=row
        this.viewData.DetailConfigure= row.configure[1]
        this.viewData.DetailFrameWork=row.frameWork
        this.viewData.introduction.DetailIntroduction= row.introduction[0]
        this.viewData.introduction.DetailIntroduction1= row.introduction[1]
        this.viewData.introduction.DetailIntroduction2= row.introduction[2]
        this.viewData.DetailRecruit= row.recruit
        this.viewData.DetailTechnology= row.technology
    },
    searchPageReturn() {
      this.searchList.searchCondition.page = 1
      this.searchManage()
      this.$Message.success('搜索完成!')
    },
    onPageChange(pageNum) {
      this.searchList.searchCondition.page = pageNum
      this.searchManage()
    },
    searchManage() {
      axios
        .get(`/admin/language/get`, {
          params: {
            page: this.searchList.searchCondition.page,
            msgTitle: this.searchList.searchCondition.msgTitle
          }
        })
        .then(res => {
          console.log(res.data.data)
          this.searchList.pageData.content = res.data.data
          this.searchList.pageData.total = res.data.total
        })
    }
  },
  created() {
    this.searchManage()
    
  }
}
</script>
<style>
.ivu-form-inline .ivu-form-item {
  margin-right: 0px !important;
}

.ivu-modal-confirm-body-icon {
  display: none;
}

.ivu-modal-confirm-body {
  padding-left: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.ivu-modal-confirm-footer {
  margin-top: 20px;
}

.ivu-form-item-content button[data-cmd='imageUpload'] {
  display: none !important;
  color: black !important;
}

.ivu-form-item-content button[data-cmd='imageByURL'] {
  display: none !important;
  color: black !important;
}

.ivu-form-item-content .fr-popup .fr-image-upload-layer {
  display: none !important;
}

.btnR {
  float: left;
  padding: 10px 18px;
}

.btnR span {
  display: flex;
  line-height: 20px;
  padding-left: 5px;
}
</style>
