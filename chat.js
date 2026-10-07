(function(){
  const API_URL='https://api.chenbridge.com/api/chat';
  const btn=document.getElementById('cb-chat-btn');
  const win=document.getElementById('cb-chat-window');
  const close=document.getElementById('cb-chat-close');
  const input=document.getElementById('cb-chat-input');
  const send=document.getElementById('cb-chat-send');
  const msgs=document.getElementById('cb-chat-messages');
  
  var teaser=document.getElementById('cb-teaser');
  var teaserClose=document.getElementById('cb-teaser-close');

  function openChat(){
    win.style.display='flex';btn.style.display='none';
    if(teaser)teaser.style.display='none';
    var badge=btn.querySelector('.cb-badge');if(badge)badge.remove();
  }
  btn.onclick=openChat;
  close.onclick=function(){win.style.display='none';btn.style.display='flex'};

  // 主动邀请气泡：6秒后弹出，每会话一次
  if(teaser && !sessionStorage.getItem('cb_teaser_shown')){
    setTimeout(function(){
      if(win.style.display!=='flex'){
        teaser.style.display='flex';
        var badge=document.createElement('span');
        badge.className='cb-badge';badge.textContent='1';
        btn.appendChild(badge);
        sessionStorage.setItem('cb_teaser_shown','1');
      }
    },6000);
    teaser.onclick=function(e){
      if(e.target.id==='cb-teaser-close')return;
      openChat();
    };
    teaserClose.onclick=function(e){
      e.stopPropagation();
      teaser.style.display='none';
    };
  }
  
  function addMsg(text,isUser){
    var div=document.createElement('div');
    div.className='cb-msg '+(isUser?'user':'bot');
    div.textContent=text;
    msgs.appendChild(div);
    msgs.scrollTop=msgs.scrollHeight;
  }
  
  function showTyping(){
    var div=document.createElement('div');
    div.className='cb-msg bot cb-typing';
    div.id='cb-typing-ind';
    div.innerHTML='<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){
    var t=document.getElementById('cb-typing-ind');
    if(t)t.remove();
  }

  async function sendMsg(){
    var text=input.value.trim();
    if(!text)return;
    addMsg(text,true);
    input.value='';
    send.disabled=true;
    showTyping();
    try{
      var res=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
      var data=await res.json();
      hideTyping();
      addMsg(data.reply||'Sorry, I cannot answer that right now. Please email contact@chenbridge.com',false);
    }catch(e){
      hideTyping();
      addMsg('Network error. Please try again or email contact@chenbridge.com',false);
    }
    send.disabled=false;
  }
  
  send.onclick=sendMsg;
  input.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg()});
})();
