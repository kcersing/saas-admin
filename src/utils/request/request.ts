import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders ,AxiosResponse} from 'axios';
import { Message } from '@arco-design/web-react';
import qs from 'query-string';


//基础URL，axios将会自动拼接在url前
//process.env.NODE_ENV 判断是否为开发环境 根据不同环境使用不同的baseURL 方便调试
const baseURL = process.env.NODE_ENV === 'development'? '' : '/';
// baseURL: process.env.REACT_APP_BASE_URL

//默认请求超时时间
const timeout = 30000;

//创建axios实例
const service = axios.create({
  timeout,
  baseURL,
  //如需要携带cookie 该值需设为true
  // withCredentials: true
});


// const service = axios.create({
//     timeout,
//     baseURL: baseURL,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     transformRequest: [
//       function(data) {
//         //由于使用的 form-data传数据所以要格式化
//         delete data.Authorization;
//         data = qs.stringify(data);
//         return data;
//       }
//     ],
//       //如需要携带cookie 该值需设为true
//     withCredentials: true,
//   });


// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      localStorage.setItem('token', response.headers.authorization);
    } else {
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    }
    console.log(response.data.token)
    if (response.status === 200) {
      return response;
    } else {
      console.log(response.status);
      showMessage(response.status);
      return response;
    }
  },
  // 请求失败
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      console.log(response.status);
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      Message.error('网络连接异常,请稍后再试!');
    }
  }
);


//统一请求拦截 可配置自定义headers 例如 language、token等
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //配置自定义请求头
    const customHeaders: AxiosRequestHeaders = {
      language: 'zh-cn'
    };
    config.headers = customHeaders;

    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
)

//axios返回格式
interface axiosTypes<T>{
  data: T;
  status: number;
  statusText: string;
}

interface responseTypes<T>{
  code: number | string,
  message: string,
  data: T,

}

//核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T>(method: 'get' | 'post' | 'put' | 'delete', url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<T> => {
  let response: Promise<axiosTypes<responseTypes<T>>>;
  switch(method){
    case 'get':
      response = service.get(url, {params: { ...params }, ...config});
      break;
    case 'post':
      response = service.post(url, {...params}, {...config});
      break;
    case 'put':
      response = service.put(url, {...params}, {...config});
      break;
    case 'delete':
      response = service.delete(url, {params: { ...params }, ...config});
      break;
  }

  return new Promise<T>((resolve, reject) => {
    response.then(res => {

      //业务代码 可根据需求自行处理
      const data = res.data;
      if(data.code !== 0){

        // //特定状态码 处理特定的需求
        // if(data.code == 401){
        //     Message.info('您的账号已登出或超时，即将登出...');
        //     console.log('登录异常，执行登出...');
        // }

        const e = JSON.stringify(data);
        Message.info(`请求错误：${e}`);
        console.log(`请求错误：${e}`)
        //数据请求错误 使用reject将错误返回
        reject(data);
      }else{
        //数据请求正确 使用resolve将结果返回
        resolve(data.data);
      }

    }).catch(error => {
      console.log(error)
      const e = JSON.stringify(error);
      Message.info(`网络错误：${e}`);
      console.log(`网络错误：${e}`)
      reject(error);
    })
  })
}

const showMessage = (status:number|string) : string => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

// 使用 request 统一调用，包括封装的get、post、put、delete等方法
const request = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('get', url, params, config),
  post: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('post', url, params, config),
  put: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('put', url, params, config),
  delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('delete', url, params, config)
};

// 导出至外层，方便统一使用
export { request };