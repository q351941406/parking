import{b as r,u as i,v as l,d as u,o as d,c as g}from"./index-vxw1eBYd.js";const h={class:"callback-container"},f={__name:"Callback",setup(m){const s=r(),n=i(),e=l(),c=async()=>{try{if(await e.handleRedirectCallback(),!await e.checkLoginStatus())return console.error("Guard is not get login status");const o=await e.trackSession();console.log(o);const t=await(await fetch("https://fc.mayizuanqian.com/auth/saveUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userInfo:o})})).json();t.code===0?(s.commit("SET_USER_INFO",t.data),localStorage.setItem("userInfo",JSON.stringify(t.data)),n.replace({name:"Home"})):alert(t.message)}catch(a){console.error("Guard handleAuthingLoginCallback error: ",a)}};return u(()=>{c()}),(a,o)=>(d(),g("div",h))}};export{f as default};
