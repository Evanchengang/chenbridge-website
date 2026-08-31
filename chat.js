(function(){
  const API_URL='https://api.chenbridge.com/api/chat';
  const btn=document.getElementById('cb-chat-btn');
  const win=document.getElementById('cb-chat-window');
  const close=document.getElementById('cb-chat-close');
  const input=document.getElementById('cb-chat-input');
  const send=document.getElementById('cb-chat-send');
  const msgs=document.getElementById('cb-chat-messages');
  
  btn.onclick=function(){win.style.display='flex';btn.style.display='none'};
  close.onclick=function(){win.style.display='none';btn.style.display='flex'};
  
  function addMsg(text,isUser){
    var div=document.createElement('div');
    div.className='cb-msg '+(isUser?'user':'bot');
    div.textContent=text;
    msgs.appendChild(div);
    msgs.scrollTop=msgs.scrollHeight;
  }
  
  async function sendMsg(){
    var text=input.value.trim();
    if(!text)return;
    addMsg(text,true);
    input.value='';
    send.disabled=true;
    send.textContent='...';
    try{
      var res=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
      var data=await res.json();
      addMsg(data.reply||'Sorry, I cannot answer that right now. Please email contact@chenbridge.com',false);
    }catch(e){
      addMsg('Network error. Please try again or email contact@chenbridge.com',false);
    }
    send.disabled=false;
    send.textContent='Send';
  }
  
  send.onclick=sendMsg;
  input.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg()});
})();
