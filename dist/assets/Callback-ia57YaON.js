import{j as c,u as l,v as i,b as u,o as d,c as h}from"./index-EgUD6bev.js";const g={class:"callback-container"},S={__name:"Callback",setup(p){const s=c(),n=l(),e=i(),r=async()=>{try{if(await e.handleRedirectCallback(),!await e.checkLoginStatus())return console.error("Guard is not get login status");const o=await e.trackSession(),t=await(await fetch("http://localhost:9000/auth/saveUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userInfo:o})})).json();t.code===0?(s.commit("SET_USER_INFO",t.data),localStorage.setItem("userInfo",JSON.stringify(t.data)),n.replace({name:"Home"})):alert(t.message)}catch(a){console.error("Guard handleAuthingLoginCallback error: ",a)}};return u(()=>{r()}),(a,o)=>(d(),h("div",g))}};export{S as default};