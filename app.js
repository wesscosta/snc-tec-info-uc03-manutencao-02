// 1) Troque pelos dados do seu projeto Supabase.
// Supabase > Project Settings > API > Project URL e anon public key.
const SUPABASE_URL = "https://qjqqpqogoxgjricazrtj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcXFwcW9nb3hnanJpY2F6cnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNzQzMDIsImV4cCI6MjA5Nzg1MDMwMn0.CGVLLoC1wODvUB9cdw1o5T43MTGW8jplVIY-QQxc0yM";

const isConfigured = SUPABASE_URL.startsWith("https://") && SUPABASE_ANON_KEY.length > 40;
const db = isConfigured ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const cases = [
  {id:1,title:"Computador não liga",clues:["O computador não liga.","Nenhum LED acende.","A tomada funciona normalmente com outro equipamento."],keywords:["fonte","alimentação","cabo de força","tomada","psu"]},
  {id:2,title:"Liga, mas sem vídeo",clues:["O computador liga.","Não aparece nenhuma imagem.","Após remover e recolocar a memória RAM, voltou a funcionar."],keywords:["memória","ram","mau contato","slot"]},
  {id:3,title:"Desliga após alguns minutos",clues:["O computador desliga sozinho.","Sempre após alguns minutos de uso.","O processador está muito quente."],keywords:["superaquecimento","temperatura","pasta térmica","cooler"]},
  {id:4,title:"No Boot Device",clues:["O computador liga.","A BIOS abre normalmente.","Aparece a mensagem No Boot Device."],keywords:["ssd","hd","disco","boot","sata","m.2"]},
  {id:5,title:"Tela azul",clues:["O Windows inicia.","Depois reinicia sozinho.","Uma tela azul aparece antes da reinicialização."],keywords:["ram","driver","sistema","windows","bsod"]},
  {id:6,title:"Monitor sem sinal",clues:["O monitor não exibe imagem.","Outro monitor funciona no mesmo computador.","O cabo HDMI está rompido."],keywords:["cabo","hdmi","vga","displayport"]},
  {id:7,title:"Disco em 100%",clues:["O computador está muito lento.","Abrir programas demora vários minutos.","O Gerenciador de Tarefas mostra disco em 100%."],keywords:["hd","disco","ssd","processos","setores","malware"]},
  {id:8,title:"USB falhando",clues:["O mouse não funciona.","Em outra porta USB ele funciona.","Nenhum dispositivo funciona naquela porta."],keywords:["usb","porta","controladora","mau contato"]},
  {id:9,title:"Wi-Fi conectado sem internet",clues:["A internet não funciona.","O Wi-Fi aparece como conectado.","Nenhum site abre, mas a rede local responde."],keywords:["dns","gateway","roteador","dhcp","internet"]},
  {id:10,title:"Notebook sem imagem interna",clues:["O notebook liga.","A tela permanece preta.","Ao conectar um monitor externo aparece imagem."],keywords:["tela","display","flat","lcd","backlight"]},
  {id:11,title:"Bipes ao ligar",clues:["O computador emite vários bipes.","Não aparece imagem.","Após trocar a RAM os bipes desaparecem."],keywords:["memória","ram","slot","mau contato"]},
  {id:12,title:"Congelamento por temperatura",clues:["O computador congela.","O cursor para de responder.","A temperatura da CPU chega a 95°C."],keywords:["superaquecimento","temperatura","cpu","cooler","pasta térmica"]},
  {id:13,title:"SSD não reconhecido",clues:["O SSD não aparece.","A BIOS também não o encontra.","Após trocar o cabo SATA, o SSD voltou."],keywords:["cabo sata","sata","ssd","cabo"]},
  {id:14,title:"Sem áudio",clues:["O computador inicia normalmente.","Não há som em nenhum aplicativo.","O driver de áudio está ausente."],keywords:["driver","áudio","som","realtek"]},
  {id:15,title:"Impressora não imprime",clues:["A impressora está ligada.","O documento não sai.","A fila de impressão está pausada."],keywords:["fila","impressão","spooler","impressora"]},
  {id:16,title:"Artefatos na tela",clues:["O computador liga normalmente.","A imagem apresenta falhas, linhas e artefatos.","Após retirar a placa de vídeo dedicada o problema desaparece."],keywords:["gpu","placa de vídeo","vram","driver de vídeo"]},
  {id:17,title:"USB frontal não funciona",clues:["O pendrive não funciona nas portas frontais.","Outro computador reconhece o pendrive normalmente.","Nenhuma USB frontal funciona."],keywords:["usb frontal","cabo interno","conector usb","placa mãe"]},
  {id:18,title:"Notebook não carrega",clues:["O notebook não carrega.","O LED do carregador acende.","Outro carregador compatível resolve o problema."],keywords:["carregador","fonte","adaptador","dc jack"]},
  {id:19,title:"Inicialização muito lenta",clues:["O Windows demora quase dez minutos para iniciar.","Depois de iniciar, ainda há travamentos.","O HD apresenta setores defeituosos."],keywords:["hd","setores","disco","bad block"]},
  {id:20,title:"Cooler barulhento",clues:["O cooler faz muito barulho.","O gabinete acumula muita poeira.","As pás estão parcialmente travadas."],keywords:["cooler","poeira","ventoinha","lubrificação"]},
  {id:21,title:"Reinício aleatório",clues:["O computador reinicia aleatoriamente.","Não aparece tela azul.","A fonte fornece tensão instável."],keywords:["fonte","psu","tensão","alimentação"]},
  {id:22,title:"Teclado só funciona na BIOS",clues:["O teclado funciona na BIOS.","No Windows ele deixa de funcionar.","O driver HID está com erro."],keywords:["driver","hid","windows","teclado"]},
  {id:23,title:"Webcam não reconhecida",clues:["A webcam não funciona.","Nenhum aplicativo consegue acessá-la.","Ela está desabilitada no Gerenciador de Dispositivos."],keywords:["webcam","driver","desabilitada","dispositivo"]},
  {id:24,title:"Rede cabeada sem sinal",clues:["O computador não detecta rede cabeada.","O LED da porta RJ45 permanece apagado.","O cabo de rede está rompido."],keywords:["cabo de rede","rj45","ethernet","placa de rede"]},
  {id:25,title:"Loop após atualização de BIOS",clues:["O computador liga normalmente.","Após alguns segundos reinicia continuamente.","A BIOS foi atualizada incorretamente."],keywords:["bios","uefi","firmware","cmos"]},
  {id:26,title:"Data e hora sempre erradas",clues:["O computador liga normalmente.","A data e a hora voltam para valores antigos após desligar.","A configuração da BIOS também é perdida."],keywords:["bateria","cmos","cr2032","bios"]},
  {id:27,title:"PC liga ao apertar várias vezes",clues:["O computador às vezes não responde ao botão power.","Depois de várias tentativas ele liga.","Ao fechar curto nos pinos do painel frontal, liga normalmente."],keywords:["botão power","painel frontal","front panel","gabinete"]},
  {id:28,title:"RAM reconhecida parcialmente",clues:["O computador possui 16 GB instalados.","O sistema mostra apenas 8 GB utilizáveis.","Um dos slots não reconhece o módulo."],keywords:["ram","slot","memória","dual channel","placa mãe"]},
  {id:29,title:"SSD M.2 não aparece",clues:["O SSD M.2 foi instalado recentemente.","A BIOS não mostra o dispositivo.","O manual informa que aquele slot desativa uma porta SATA ou exige modo NVMe."],keywords:["m.2","nvme","bios","compatibilidade","sata"]},
  {id:30,title:"PC trava ao abrir jogos",clues:["O computador funciona em tarefas simples.","Ao abrir jogos ou programas pesados, trava ou fecha sozinho.","A placa de vídeo esquenta muito e o driver reinicia."],keywords:["gpu","placa de vídeo","temperatura","driver","fonte"]},
  {id:31,title:"Sem internet após formatação",clues:["O Windows foi reinstalado.","Não aparece opção de Wi-Fi.","O Gerenciador de Dispositivos mostra controlador de rede sem driver."],keywords:["driver","rede","wi-fi","controlador"]},
  {id:32,title:"Som saindo no dispositivo errado",clues:["O áudio existe, mas não sai na caixa desejada.","O fone Bluetooth aparece conectado.","O Windows selecionou outro dispositivo de saída."],keywords:["dispositivo de saída","áudio","bluetooth","configuração"]},
  {id:33,title:"Tela azul ao conectar pendrive",clues:["O Windows funciona normalmente.","Ao conectar um pendrive específico, ocorre tela azul.","O antivírus detectou comportamento suspeito no dispositivo."],keywords:["malware","pendrive","driver","usb","vírus"]},
  {id:34,title:"PC não mantém desempenho",clues:["O computador começa rápido.","Depois de algum tempo, fica lento.","A frequência do processador cai por temperatura alta."],keywords:["thermal throttling","superaquecimento","temperatura","cpu","cooler"]},
  {id:35,title:"Erro de SMART",clues:["Ao ligar, aparece um aviso antes do sistema iniciar.","A mensagem recomenda fazer backup.","A ferramenta de diagnóstico mostra falhas SMART no disco."],keywords:["smart","hd","ssd","backup","disco"]},
  {id:36,title:"Sistema sem espaço",clues:["O computador está lento e não atualiza.","O Windows informa pouco espaço disponível.","A unidade C está quase cheia."],keywords:["espaço","armazenamento","disco cheio","unidade c"]},
  {id:37,title:"Monitor pisca",clues:["A imagem aparece e desaparece rapidamente.","O problema piora ao mexer no cabo.","Trocar o cabo DisplayPort resolve."],keywords:["cabo","displayport","hdmi","mau contato","monitor"]},
  {id:38,title:"PC liga sozinho",clues:["O computador liga sem apertar o botão.","Isso ocorre depois de queda de energia.","Na BIOS, a opção de restaurar energia está ativada."],keywords:["bios","restore on ac power loss","energia","configuração"]},
  {id:39,title:"Reinicia ao conectar periférico",clues:["O computador funciona até conectar um dispositivo USB.","Ao conectar, ele reinicia imediatamente.","O periférico apresenta curto em outro computador também."],keywords:["curto","usb","periférico","fonte","porta usb"]},
  {id:40,title:"Teclas digitando errado",clues:["O teclado digita caracteres diferentes.","Algumas teclas aparecem trocadas.","O layout do teclado está configurado incorretamente."],keywords:["layout","abnt","teclado","idioma"]},
  {id:41,title:"Notebook aquecendo na mesa",clues:["O notebook esquenta mais que o normal.","As saídas de ar estão parcialmente bloqueadas.","Usar uma base elevada reduz a temperatura."],keywords:["ventilação","superaquecimento","saída de ar","cooler"]},
  {id:42,title:"Aplicativo fecha sozinho",clues:["O sistema continua funcionando.","Um programa específico fecha sem aviso.","O log aponta erro em biblioteca ou dependência."],keywords:["software","dependência","biblioteca","reinstalação","log"]},
  {id:43,title:"Atualização travada",clues:["O Windows está tentando atualizar.","A instalação fica parada por muito tempo.","Há arquivos de atualização corrompidos na pasta do sistema."],keywords:["windows update","atualização","cache","sistema corrompido"]},
  {id:44,title:"Internet lenta somente nesse PC",clues:["Outros dispositivos navegam bem.","Esse computador está com download muito baixo.","Há muitos processos consumindo rede em segundo plano."],keywords:["rede","processos","largura de banda","malware","driver"]},
  {id:45,title:"Placa-mãe não salva configuração",clues:["A ordem de boot é alterada manualmente.","Após desligar da tomada, a configuração volta ao padrão.","A bateria CMOS está descarregada."],keywords:["cmos","bateria","bios","cr2032"]},
  {id:46,title:"Erro ao instalar sistema",clues:["A instalação do Windows começa normalmente.","Na etapa de escolher o disco, nenhum armazenamento aparece.","O modo RAID/Intel RST está ativado na BIOS."],keywords:["raid","rst","driver","bios","armazenamento"]},
  {id:47,title:"Microfone não capta som",clues:["O fone reproduz áudio normalmente.","Nenhum aplicativo recebe voz.","A permissão de microfone está desativada no sistema."],keywords:["microfone","permissão","privacidade","driver","entrada"]},
  {id:48,title:"PC com cheiro de queimado",clues:["O computador desligou durante o uso.","Há cheiro forte vindo da fonte.","Ao testar com outra fonte, o computador liga."],keywords:["fonte","queimado","psu","curto","alimentação"]},
  {id:49,title:"Imagem só aparece pela placa-mãe",clues:["O cabo está conectado na saída da placa-mãe.","Existe uma placa de vídeo dedicada instalada.","Ao conectar o cabo na GPU, a imagem aparece corretamente."],keywords:["placa de vídeo","gpu","saída de vídeo","conexão"]},
  {id:50,title:"Computador lento com pop-ups",clues:["O computador exibe propagandas inesperadas.","O navegador abre páginas sozinho.","A verificação encontra extensões suspeitas e adware."],keywords:["malware","adware","vírus","extensão","navegador"]}
];

let currentStudent = JSON.parse(localStorage.getItem("student") || "null");
let currentCase = null;
let revealed = 0;
let rescueMode = false;

const $ = (id) => document.getElementById(id);

function normalize(text){return (text||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function basePoints(){ if(rescueMode) return 5; return revealed <= 1 ? 10 : revealed === 2 ? 9 : 8; }
function setStatus(){ $("connectionStatus").textContent = isConfigured ? "Supabase conectado" : "Modo local: configure o Supabase"; }
function saveStudent(){
  const name = $("studentName").value.trim();
  const klass = $("className").value.trim() || "Turma não informada";
  if(!name) return alert("Informe o nome do aluno ou dupla.");
  currentStudent = {name, class_name: klass};
  localStorage.setItem("student", JSON.stringify(currentStudent));
  renderPlayer();
}
function renderPlayer(){
  if(currentStudent){
    $("studentName").value = currentStudent.name;
    $("className").value = currentStudent.class_name;
    $("playerLabel").textContent = `Jogador: ${currentStudent.name} · ${currentStudent.class_name}`;
  }
}
function renderCaseButtons(){
  const box = $("caseSelector"); box.innerHTML = "";
  cases.forEach(c=>{
    const btn = document.createElement("button");
    btn.textContent = `Caso ${String(c.id).padStart(2,"0")}`;
    btn.onclick = ()=>selectCase(c.id);
    btn.id = `caseBtn${c.id}`;
    box.appendChild(btn);
  });
}
function selectCase(id){
  currentCase = cases.find(c=>c.id===id); revealed = 0; rescueMode = false;
  document.querySelectorAll(".case-selector button").forEach(b=>b.classList.remove("active"));
  $(`caseBtn${id}`).classList.add("active");
  $("caseBox").classList.remove("hidden");
  $("caseTitle").textContent = `${String(currentCase.id).padStart(2,"0")} · ${currentCase.title}`;
  $("clues").innerHTML = ""; $("feedback").textContent = ""; $("feedback").className = "feedback";
  $("answerForm").reset(); updatePoints(); revealNextClue();
}
function revealNextClue(){
  if(!currentCase || revealed >= 3) return;
  const div = document.createElement("div"); div.className = "clue";
  div.innerHTML = `<strong>Pista ${revealed+1}</strong><br>${currentCase.clues[revealed]}`;
  $("clues").appendChild(div); revealed++; updatePoints();
  if(revealed >= 3) $("nextClueBtn").disabled = true; else $("nextClueBtn").disabled = false;
}
function updatePoints(){ $("casePoints").textContent = `${basePoints()} pts`; }
function setRescue(){ rescueMode = true; updatePoints(); }
function scoreAnswer(){
  const diagnosis = normalize($("diagnosis").value);
  const causes = normalize($("causes").value);
  const verification = normalize($("verification").value);
  const all = `${diagnosis} ${causes} ${verification}`;
  const keywordHit = currentCase.keywords.some(k => all.includes(normalize(k)));
  const hasCause = causes.split(/[,;\n]/).filter(x=>x.trim().length>8).length >= 2 || causes.length > 45;
  const hasVerification = verification.length >= 35;
  const base = basePoints();
  if(keywordHit && hasCause && hasVerification) return {score:base, ok:true, msg:`Resposta validada com ${base} pontos.`};
  if(keywordHit) return {score:Math.ceil(base/2), ok:false, msg:`Diagnóstico parcialmente validado. Faltou detalhar causas ou verificação. Pontuação: ${Math.ceil(base/2)}.`};
  return {score:0, ok:false, msg:"Resposta enviada, mas o diagnóstico não bateu com as palavras-chave esperadas. O professor pode revisar manualmente."};
}
async function submitAnswer(e){
  e.preventDefault();
  if(!currentStudent) return alert("Entre no jogo com seu nome antes de responder.");
  if(!currentCase) return;
  const result = scoreAnswer();
  const payload = {
    student_name: currentStudent.name,
    class_name: currentStudent.class_name,
    case_id: currentCase.id,
    case_title: currentCase.title,
    clues_used: rescueMode ? 4 : revealed,
    rescue_mode: rescueMode,
    diagnosis: $("diagnosis").value.trim(),
    causes: $("causes").value.trim(),
    verification: $("verification").value.trim(),
    score: result.score
  };
  if(isConfigured){
    const {error} = await db.from("submissions").upsert(payload, {onConflict:"student_name,class_name,case_id"});
    if(error){ console.error(error); alert("Erro ao salvar no Supabase: " + error.message); return; }
  } else {
    const rows = JSON.parse(localStorage.getItem("submissions")||"[]");
    const idx = rows.findIndex(r=>r.student_name===payload.student_name && r.class_name===payload.class_name && r.case_id===payload.case_id);
    if(idx>=0) rows[idx]=payload; else rows.push(payload);
    localStorage.setItem("submissions", JSON.stringify(rows));
  }
  $("feedback").textContent = result.msg;
  $("feedback").className = `feedback ${result.ok?"ok":"warn"}`;
  loadRanking();
}
async function loadRanking(){
  let rows = [];
  if(isConfigured){
    const {data,error} = await db.from("leaderboard").select("*").limit(50);
    if(error){ console.error(error); return; }
    rows = data || [];
  } else {
    const submissions = JSON.parse(localStorage.getItem("submissions")||"[]");
    const grouped = {};
    submissions.forEach(r=>{
      const key = `${r.student_name}|${r.class_name}`;
      grouped[key] ??= {student_name:r.student_name,class_name:r.class_name,total_score:0,cases_answered:0};
      grouped[key].total_score += Number(r.score||0); grouped[key].cases_answered += 1;
    });
    rows = Object.values(grouped).sort((a,b)=>b.total_score-a.total_score);
  }
  const list = $("rankingList"); list.innerHTML = "";
  if(!rows.length){ list.innerHTML = "<li>Nenhuma resposta enviada ainda.</li>"; return; }
  rows.forEach((r,i)=>{
    const li = document.createElement("li");
    li.innerHTML = `<strong>${i+1}º · ${r.student_name}</strong><span>${r.class_name} · ${r.total_score} pontos · ${r.cases_answered} casos</span>`;
    list.appendChild(li);
  });
}
function randomCase(){ selectCase(cases[Math.floor(Math.random()*cases.length)].id); }

document.addEventListener("DOMContentLoaded",()=>{
  setStatus(); renderPlayer(); renderCaseButtons(); loadRanking();
  $("saveStudentBtn").onclick = saveStudent;
  $("nextClueBtn").onclick = revealNextClue;
  $("rescueBtn").onclick = setRescue;
  $("randomCaseBtn").onclick = randomCase;
  $("refreshRankingBtn").onclick = loadRanking;
  $("answerForm").onsubmit = submitAnswer;
});
