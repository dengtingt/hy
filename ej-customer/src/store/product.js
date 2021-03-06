import {get,post,post_array} from '../http/axios';

export default {
  namespaced:true,
  state:{
    products:[],
    visible:false,
    title:"添加产品信息",
    shopcar:[],
    // product:{}
  },
  getters:{
    productSize(state){
      return state.products.length;
    },
    orderProduct:(state)=>{
      return function(flag){
        state.products.sort((a,b)=>{
          if(a[flag] > b[flag]){
            return -1;
          } else {
            return 1;
          }
        })
        return state.products;
      }
    },
    productStatusFilter(state){
      return (categoryId)=>{
        return state.products.filter((item)=>{
          return item.categoryId === categoryId
        })
      }
  },
  shopprice(state){
   
    let total = 0 ;
    state.shopcar.forEach((item)=>{
      total+= (item.number * item.price*100)
    }); 
    return total;
  }
  },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    refreshProducts(state,products){
      state.products = products;
    },
    // refreshProduct(state,product){
    //   state.product = product;
    // },
    setTitle(state,title){
      state.title = title;
    },
    shopcard(state,line){
      let flag = state.shopcar.some(res=>
        res.productId===line.productId
      )
      // let flag = state.shopcar.some(item=>item.productId === line.productId)
      if(flag){
        state.shopcar.forEach(res=>{
          if(res.productId===line.productId){
            res.number = line.number;
          }
        })  
      }else{
        state.shopcar.push(line);
      }
    }
  },
  actions:{
    async batchDeleteProduct(context,ids){
      // 1. 批量删除
      let response = await post_array("/product/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllProducts");
      // 3. 返回结果
      return response;
    },
    async deleteProductById(context,id){
      let response = await get("/product/deleteById?id="+id);
      context.dispatch("findAllProducts");
      return response;
    },
    async findAllProducts(context){
      // 1. ajax查询
      let response = await get("/product/findAll");
        response.data.forEach(item => {
          item.number = 0;
      });
      // 2. 将查询结果更新到state中
      context.commit("refreshProducts",response.data);
    },
    // payload 顾客信息
    async saveOrUpdateProduct({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await post("/product/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllProducts");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}