// Barra de progreso de lectura
const pr=document.getElementById('progreso');
addEventListener('scroll',()=>{const h=document.documentElement;pr.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'});
// Pestañas
document.querySelectorAll('.tabs').forEach(t=>{const bs=t.querySelectorAll('button');
bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>{x.setAttribute('aria-selected',x===b);
document.getElementById(x.dataset.p).hidden=x!==b})}))});
// ===== Test inicial y bloqueo de acceso =====
const MINIMO=6; // respuestas correctas necesarias (de 9)
const KEY='ova_so_test_ok';
function leer(){try{return sessionStorage.getItem(KEY)==='1'}catch(e){return null}}
function guardar(){try{sessionStorage.setItem(KEY,'1')}catch(e){}}
if(document.body.hasAttribute('data-gate')&&leer()===false)location.replace('evaluacion.html');
const T=[
["Memoria virtual","Un fallo de página ocurre cuando…",["El proceso accede a una página que no está cargada en memoria principal","El disco se llena","La CPU se sobrecalienta"],0,"El hardware avisa al sistema operativo, que trae la página desde el almacenamiento secundario."],
["Memoria virtual","¿Qué algoritmo de reemplazo elige la página que lleva más tiempo sin usarse?",["FIFO","LRU","Reloj aleatorio"],1,"LRU (menos recientemente usada) se basa en el pasado reciente como aproximación del futuro."],
["Memoria virtual","La hiperpaginación (thrashing) es cuando…",["El sistema dedica más tiempo a paginar que a ejecutar procesos","Un proceso termina muy rápido","Se amplía la memoria física"],0,"Ocurre cuando los procesos no tienen suficientes marcos y generan fallos de página constantes."],
["Entrada/Salida","¿Qué permite transferir datos entre un dispositivo y la memoria sin que la CPU intervenga en cada byte?",["Un compilador","DMA (acceso directo a memoria)","La caché de la CPU"],1,"El controlador DMA mueve bloques de datos y avisa con una interrupción al terminar."],
["Entrada/Salida","El spooling sirve para…",["Cifrar los datos","Guardar en un almacenamiento intermedio las salidas de un dispositivo que no admite datos intercalados, como una impresora","Aumentar la memoria virtual"],1,"Cada trabajo se guarda en cola y se envía al dispositivo de uno en uno."],
["Entrada/Salida","Un controlador de dispositivo (driver) se encarga de…",["Ofrecer al núcleo una interfaz uniforme que oculta las diferencias del hardware","Planificar la CPU","Asignar direcciones IP"],0,"Gracias a los drivers, el subsistema de E/S trata distintos dispositivos de forma homogénea."],
["Seguridad","Un caballo de Troya es…",["Un programa que parece legítimo pero abusa de su entorno","Un cortafuegos","Un algoritmo de cifrado"],0,"Se presenta como útil y realiza acciones no deseadas con los permisos del usuario."],
["Seguridad","En el cifrado simétrico…",["Se usan dos claves distintas, una pública y otra privada","Se usa la misma clave para cifrar y descifrar","No se necesita ninguna clave"],1,"El reto es compartir la clave secreta de forma segura entre las partes."],
["Seguridad","La autenticación consiste en…",["Comprobar la identidad de un usuario o programa","Copiar archivos","Medir el rendimiento"],0,"Es el paso previo a la autorización, que define qué puede hacer cada usuario."]];
const fm=document.getElementById('test');
if(fm){document.getElementById('min').textContent=MINIMO+' de '+T.length;
T.forEach((q,i)=>{const f=document.createElement('fieldset');f.style.cssText='border:1px solid #cfdcd1;border-radius:8px;margin:.8rem 0;background:#fff';
f.innerHTML=`<legend><strong>${q[0]}</strong></legend><p>${i+1}. ${q[1]}</p>`+q[2].map((o,j)=>`<label class="op"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join('')+'<p class="fb" style="margin:.4rem 0"></p>';fm.appendChild(f)});
const b=document.createElement('button');b.type='submit';b.className='btn s';b.textContent='Calificar test';fm.appendChild(b);
fm.addEventListener('submit',e=>{e.preventDefault();if(fm.dataset.enviado)return;
if(fm.querySelectorAll('input:checked').length<T.length){document.getElementById('resultado').innerHTML='<div class="res mal">Responde las 9 preguntas antes de calificar.</div>';return}
let s=0;const por={};
T.forEach((q,i)=>{const v=+fm.querySelector(`input[name=q${i}]:checked`).value,ok=v===q[3],fb=fm.querySelectorAll('.fb')[i];
if(ok)s++;por[q[0]]=(por[q[0]]||0)+(ok?1:0);fb.textContent=(ok?'Correcto. ':'Incorrecto. ')+q[4];fb.style.color=ok?'#1b7f3b':'#b3261e'});
fm.dataset.enviado='1';fm.querySelectorAll('input').forEach(x=>{x.disabled=true;x.parentElement.classList.add('bloq')});b.disabled=true;
const r=document.getElementById('resultado'),det=Object.entries(por).map(([k,v])=>`${k}: ${v}/3`).join(' · ');
if(s>=MINIMO){guardar();r.innerHTML=`<div class="res">Aprobaste con ${s} de ${T.length}. ${det}</div><p><a class="btn s" href="tiempo-real.html">Iniciar el tema →</a></p>`}
else r.innerHTML=`<div class="res mal">Obtuviste ${s} de ${T.length}. ${det}. Repasa los temas anteriores e inténtalo de nuevo.</div><p><button class="btn s" onclick="location.reload()">Reintentar</button></p>`;
const ri=document.getElementById('reint');if(ri)ri.onclick=()=>{fm.reset();delete fm.dataset.enviado;fm.querySelectorAll('input').forEach(x=>{x.disabled=false;x.parentElement.classList.remove('bloq')});fm.querySelectorAll('.fb').forEach(x=>x.textContent='');b.disabled=false;r.innerHTML='';scrollTo({top:0,behavior:'smooth'})};
r.scrollIntoView({behavior:'smooth'})})}
