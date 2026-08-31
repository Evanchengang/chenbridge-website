(function(){
  const API_URL='https://api-cn.chenbridge.com/api/chat';
  const btn=document.getElementById('cb-chat-btn');
  const win=document.getElementById('cb-chat-window');
  const close=document.getElementById('cb-chat-close');
  const input=document.getElementById('cb-chat-input');
  const send=document.getElementById('cb-chat-send');
  const msgs=document.getElementById('cb-chat-messages');
  
  var audioCtx=null;
  function initAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)()}
  function playDing(){
    initAudio();
    if(audioCtx.state==='suspended')audioCtx.resume();
    var osc=audioCtx.createOscillator();
    var gain=audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type='sine';
    osc.frequency.setValueAtTime(880,audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440,audioCtx.currentTime+.15);
    gain.gain.setValueAtTime(.15,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.15);
    osc.start();
    osc.stop(audioCtx.currentTime+.15);
  }
  
  btn.onclick=function(){win.style.display='flex';btn.style.display='none';initAudio()};
  close.onclick=function(){win.style.display='none';btn.style.display='flex'};
  
  // 中文站保留：5秒后自动弹出（拟人化主动打招呼）
  setTimeout(function(){
    if(win.style.display!=='flex'){win.style.display='flex';btn.style.display='none'}
  },5000);
  
  function addMsg(text,isUser){
    var row=document.createElement('div');
    row.className='cb-msg-row '+(isUser?'user':'');
    if(!isUser){
      var avatar=document.createElement('div');
      avatar.className='cb-avatar';
      avatar.textContent='🤖';
      row.appendChild(avatar);
    }
    var div=document.createElement('div');
    div.className='cb-msg '+(isUser?'user':'bot');
    div.innerHTML=text.replace(/\n/g,'<br>');
    row.appendChild(div);
    msgs.appendChild(row);
    msgs.scrollTop=msgs.scrollHeight;
    if(!isUser)playDing();
  }
  
  // 拟人化：显示"正在输入"提示
  function showTyping(){
    var row=document.createElement('div');
    row.id='cb-typing-row';
    row.className='cb-msg-row';
    var avatar=document.createElement('div');
    avatar.className='cb-avatar';
    avatar.textContent='🤖';
    row.appendChild(avatar);
    var indicator=document.createElement('div');
    indicator.className='cb-typing-indicator';
    indicator.innerHTML='<span></span><span></span><span></span>';
    row.appendChild(indicator);
    msgs.appendChild(row);
    msgs.scrollTop=msgs.scrollHeight;
  }
  
  function hideTyping(){
    var t=document.getElementById('cb-typing-row');
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
      // 拟人化：延迟 300ms 回复，更像真人打字
      setTimeout(function(){
        addMsg(data.reply||'抱歉，暂时无法回答。请发邮件到 contact@chenbridge.com',false);
      },300);
    }catch(e){
      hideTyping();
      addMsg('网络异常，请稍后重试。',false);
    }
    send.disabled=false;
  }
  
  send.onclick=sendMsg;
  input.onkeypress=function(e){if(e.key==='Enter')sendMsg()};
})();
