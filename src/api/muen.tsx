import { request } from 'utils/request'
import React, { Component } from 'react';
//
// export const GetMenu = () => request.get('/api/admin/menu/role');

// export const USerMenu =   GetMenu().then((res) => { return res});

export async  function getUserMenu() {
  const data = await request.get('/api/admin/menu/role').then((res) => {
    
//   this.setState({
//     roleList: res
//   })
// })

  return data
}

// console.log(this.state.roleList)