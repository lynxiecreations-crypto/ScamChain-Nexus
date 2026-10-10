(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var samples={
 bank:{title:'Account suspension lure',channel:'SMS / messaging',description:'Bank impersonation, urgency and a direct OTP request.',text:'[FICTIONAL TEST] ALERT: Your bank account will be blocked in 30 minutes. Complete KYC and reply with your OTP to restore access. Do not ignore this final warning.'},
 delivery:{title:'Fake parcel fee',channel:'SMS / messaging',description:'Delivery pretext, small fee pressure and an untrusted link.',text:'[FICTIONAL TEST] Parcel delivery failed. Pay ₹25 redelivery fee today at http://parcel-redelivery.example/fee or your package will be returned. Enter card details to continue.'},
 email:{title:'Prize claim email',channel:'Email',description:'Unexpected reward, deadline pressure and credential harvesting language.',text:'[FICTIONAL TEST EMAIL] Subject: You have won a reward. Dear customer, claim your prize within 2 hours by signing in at https://rewards-claim.example/login and confirming your password and verification code. Do not miss this opportunity.'},
 apk:{title:'Remote support app',channel:'WhatsApp',description:'Sideloaded APK request combined with remote access and secrecy.',text:'[FICTIONAL TEST] Customer support needs you to install support_update.apk from this file link, enable Accessibility and screen sharing, then keep the call open while we fix your bank app. Do not contact your bank separately.'},
 upi:{title:'Incoming payment trick',channel:'Payment request',description:'A fake incoming-payment story attempts to make the victim approve a collect request and enter a UPI PIN.',text:'[FICTIONAL TEST] I am sending you a refund. Open your UPI app and APPROVE this collect request; enter your UPI PIN to receive the money. Do it immediately or the refund expires.'}
};
var selected=null;
document.querySelectorAll('[data-shield-sample]').forEach(function(btn){
 btn.addEventListener('click',function(){
  selected=samples[btn.getAttribute('data-shield-sample')];
  document.querySelectorAll('[data-shield-sample]').forEach(function(b){b.classList.toggle('active',b===btn)});
  $('shieldSampleTitle').textContent=selected.title;
  $('shieldSampleDescription').textContent=selected.description+' Sample content is fictional and uses reserved .example domains.';
  $('shieldRunLoaded').disabled=false;
  $('shieldRunLoaded').textContent='Open Quick Check with sample ↗';
 });
});
$('shieldRunLoaded').addEventListener('click',function(){
 if(!selected)return;
 var q=$('quickText'),c=$('quickChannel');
 if(q)q.value=selected.text;
 if(c)c.value=selected.channel;
 var quickNav=document.querySelector('[data-view="quickcheck"]');
 if(quickNav)quickNav.click();
 if(q)q.focus();
 var toast=$('toast');
 if(toast){toast.textContent='Fictional example loaded. Select “Check this message” to run the existing ScamChain analysis.';toast.classList.remove('hidden');}
});
var plans={
 received:{title:'You only received it',steps:['Do not reply, click links, open attachments or share codes.','Verify the claim through the organisation’s official app or a number you already trust.','Block/report the sender if appropriate; keep the message if you may need to report it.']},
 clicked:{title:'You clicked a link',steps:['Close the page; do not download files or enter more information.','If you entered a password, change it from a trusted device and sign out other sessions.','Check account activity. If a file was downloaded or installed, use trusted security software and get help if needed.']},
 shared:{title:'You shared a secret',steps:['Contact the relevant bank/service immediately through its official app or number.','Change exposed passwords, revoke sessions and secure payment methods from a trusted device.','Review recent activity. If financial fraud is suspected, call India’s 1930 helpline promptly and preserve evidence.']},
 installed:{title:'You installed an app or allowed remote access',steps:['Disconnect the device from the internet if remote control may still be active; do not use it for banking until checked.','From a separate trusted device, contact your bank if banking or payment apps were accessible.','Remove the untrusted app/accessibility permissions and run a trusted security scan; seek technical help if unsure.']},
 paid:{title:'You sent money or approved a payment',steps:['Call your bank/payment provider through official channels immediately and ask them to flag or secure the transaction.','In India, call 1930 promptly if you suspect financial cyber fraud and file/update a report at cybercrime.gov.in.','Preserve the transaction reference, timestamp, recipient details and messages. Do not pay anyone promising guaranteed recovery.']}
};
$('shieldGetHelp').addEventListener('click',function(){
 var plan=plans[$('shieldIncidentType').value],el=$('shieldHelpResult');
 el.innerHTML='<h4>'+plan.title+'</h4><ol>'+plan.steps.map(function(s){return '<li>'+s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</li>'}).join('')+'</ol><p class="fineprint">Guidance only; it cannot confirm compromise or replace your bank, device-security provider or local authorities.</p>';
});
var checks=Array.prototype.slice.call(document.querySelectorAll('.shield-checklist input'));
function updateChecklist(){
 var count=checks.filter(function(c){return c.checked}).length;
 $('shieldChecklistCount').textContent=count+' of '+checks.length+' completed';
 $('shieldChecklistBar').style.width=(count/checks.length*100)+'%';
}
checks.forEach(function(c){c.addEventListener('change',updateChecklist)});
var titles={overview:['Connect the signals.','A single message is a clue. A connected sequence can reveal the attack workflow.'],quickcheck:['Pause. Paste. Understand.','Screen a suspicious message, inspect its warning signs, and choose safer next steps.'],intake:['Build the case.','Add evidence events, inspect indicators, and correlate the timeline.'],graph:['Explore the suspected workflow.','Inspect event nodes, shared entities and inferred stages.'],evidence:['Trace every conclusion.','Review the evidence, reasoning, uncertainty and missing corroboration.'],simulator:['Experience the scam.','Interact with fictional messages and see plain-language warnings before exploring the suspected attack chain.'],emailintel:['Investigate the email.','Classify email risk, inspect sender identity, and review reported authentication evidence locally.'],shieldhub:['Protection actions. Connected investigation.','Use scenario testing, guided response and protection steps alongside ScamChain’s existing analysis tools.'],reconstruct:['Rewind the scam. Find the safe stop.','Reconstruct the suspected workflow, inspect its evidence, and test safer decisions in a local simulation.']};
var current=$('pageTitle');
if(location.hash==='#shieldhub'&&current){current.innerHTML='Protection actions.<br><span>Connected investigation.</span>';$('pageSubtitle').textContent=titles.shieldhub[1]}
updateChecklist();
})();