// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from '@/api/axios.js';
//vuex
import store from './store'
import api from './api/api.js'
import { Row, Col, Container, Aside, Header, Footer, Main, Menu, Submenu, MenuItem, Tooltip, Button, Dropdown, DropdownMenu, DropdownItem, Collapse, CollapseItem, Popover, Tree, Dialog, Form, FormItem, Select, Option, OptionGroup, Card, Input, Message, Loading, DatePicker, TimePicker, Cascader, Tag, Table, TableColumn, Checkbox} from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import "./assets/icon/iconfont.css";
import "./assets/css/common.css";

// Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
//给Vue原型挂载一个属性
Vue.prototype.$axios = Axios;

// Vue.use(ElementUI);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Button.name, Button);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Popover.name, Popover);
Vue.component(Tree.name, Tree);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Input.name, Input);
Vue.component(Card.name, Card);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Cascader.name, Cascader);
Vue.component(Tag.name, Tag);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Checkbox.name, Checkbox);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
