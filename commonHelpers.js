import{a as q,i as C,s as S}from"./assets/vendor-ecdaabbe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const $="/goit-js-hw-12/assets/error-icon-06de2d57.svg",x="/goit-js-hw-12/assets/close-icon-5e09cdae.svg",d=document.querySelector(".search-form"),u=document.querySelector(".images-list"),f=document.querySelector(".loader"),i=document.querySelector(".load-more-form");let l=1,p=15,c=null,h=0;d.addEventListener("submit",M);i.addEventListener("submit",B);async function M(o){if(o.preventDefault(),u.innerHTML="",l=1,i.classList.add("hidden"),c=d.elements.search.value.trim(),c!==""){b();try{const t=await m(c);g(t),h=t.total,t.hits.length!==0&&i.classList.remove("hidden")}catch(t){console.log(t)}L(),v(),d.reset()}}async function B(o){o.preventDefault(),i.classList.add("hidden"),l++,b();try{const r=await m(c);g(r),r.hits.length!==0&&i.classList.remove("hidden")}catch(r){console.log(r)}L(),v();const t=document.querySelector(".gallery-image"),{height:n}=t.getBoundingClientRect();window.scrollBy({top:n*3.5,left:0,behavior:"smooth"})}async function m(o){return(await q.get("https://pixabay.com/api/",{params:{key:"42394910-99d99ece52e00ce85305c6646",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:l}})).data}function g({hits:o}){if(o.length===0){y("Sorry, there are no images matching<br/> your search query. Please try again!");return}const t=o.map(({webformatURL:n,largeImageURL:r,tags:e,likes:s,views:a,comments:w,downloads:O})=>`<li class="gallery-item">
      <a class="gallery-link" href="${r}"
        ><img class="gallery-image" src="${n}" alt="${e}"
      /></a>
      <div class="info-box">
        <p>Likes <span>${s}</span></p>
        <p>Views <span>${a}</span></p>
        <p>Comments <span>${w}</span></p>
        <p>Downloads <span>${O}</span></p>
      </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",t),D()}function y(o){C.show({message:o,messageColor:"#fff",messageSize:"16",messageLineHeight:"24",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",position:"topRight",iconUrl:$,close:!1,buttons:[[`<button type="submit" style="background-color: inherit"><img src="${x}"/></button>`,function(t,n){t.hide({transitionOut:"fadeOut"},n)}]]})}function D(){new S(".images-list a",{captionsData:"alt",captionsDelay:250}).refresh()}function b(){f.classList.remove("hidden")}function L(){f.classList.add("hidden")}function v(){Math.ceil(h/p)===l&&(i.classList.add("hidden"),y("We're sorry, but you've reached</br> the end of search results."))}
//# sourceMappingURL=commonHelpers.js.map