<template>
  <div class="customer_details">
    <h2>顾客详情</h2>

    <el-button type="primary" size="small" @click="backHandler">返回</el-button>

    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        <el-table :data="customersFilter(this.$route.query.id)">
          <el-table-column label="姓名" prop="realname" />
          <el-table-column label="登录名" prop="username" />
          <el-table-column label="登录密码" prop="password" />
          <el-table-column label="类型" prop="type" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
        <el-table :data="ordersFilter(this.$route.query.id)">
          <el-table-column label="顾客编号" prop="customerId" />
          <el-table-column label="员工编号" prop="waiterId" />
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="地址编号" prop="addressId" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="订单状态" prop="status" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="服务地址" name="address">
        <el-table :data="address">
          <el-table-column label="省" prop="province" />
          <el-table-column label="市" prop="city" />
          <el-table-column label="区" prop="area" />
          <el-table-column label="街道" prop="address" />
          <el-table-column label="手机号" prop="telephone" />
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'info'
    }
  },
  created() {
    const id = this.$route.query.id
    this.findAddressByCustomerId(id)
    this.findAllOrders()
    // console.log(this.ordersFilter(id))
  },
  computed: {
    ...mapState('address', ['address', 'orders']),
    ...mapState('customer', ['orders', 'customers']),
    ...mapGetters('customer', ['ordersFilter', ['customersFilter']])
  },
  methods: {
    ...mapActions('address', ['findAddressByCustomerId', 'findAllOrders']),
    ...mapActions('customer', ['findAllOrders']),

    // 普通方法
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
