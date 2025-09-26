import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main
  , Option
} from 'element-ui'
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Option)
Vue.component('tree-table', TreeTable)
Vue.prototype.$msg = Message
