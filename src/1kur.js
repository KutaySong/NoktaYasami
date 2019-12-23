const noktaÇapı= 40; const renkAdedi= 10;     const noktaAdedi= 400;
let noktalar= [];   let renkDizgesi= [];    let ilişkiMatrisi=[];
let fare = {çekimaktif: 0, sontıklanan:-1, çekimX: -1, çekimY: -1} 
let yerÇekimi = 0.04 ; let itimÇekim = -0.25
let ekranaYazı= false

function setup() {    
	createCanvas(innerWidth-30, innerHeight-40)
    colorMode(HSB)
    textSize(60)
    strokeWeight(12)
    noStroke()
    
    renkleriKur()
    for (let i = 0; i < noktaAdedi; i++) {
        noktalar.push(new nokta(i));
    }
}


class nokta {
    constructor(numero){
        this.ID= noktalar.length
        this.tip= floor(random(renkAdedi))
        this.x= random(100,innerWidth-30-100)
        this.y= random(100,innerHeight-40-100)
        this.hızX= 0
        this.hızY= 0
    }
}


function renkleriKur () {
    
    for (let i = 0; i < renkAdedi; i++) {
        //RENK belirle
        if (!i) renkDizgesi[i]=floor(random(360))
        else renkDizgesi[i]=(renkDizgesi[i-1]+floor(360/renkAdedi))%360
        
        ilişkiMatrisi[i]= []
        
        //BİRBİRLERİYLE ilişkilerini yaz
        for (let j = 0; j < renkAdedi; j++) { 
            ilişkiMatrisi[i][j]= {}
            ilişkiMatrisi[i][j].çekimGücü = yerÇekimi * randomGaussian(itimÇekim,abs(itimÇekim)) //L'ye basım ayarı
            if (i==j) { // kendini dibine kadar çeksin
                ilişkiMatrisi[i][j].çekimGücü = - abs(ilişkiMatrisi[i][j].çekimGücü) 
                ilişkiMatrisi[i][j].ufakÇap = noktaÇapı/2
            } else {
                ilişkiMatrisi[i][j].ufakÇap = max(random(0,noktaÇapı*3),noktaÇapı/2)
            }
            ilişkiMatrisi[i][j].büyükÇap = random(ilişkiMatrisi[i][j].ufakÇap,noktaÇapı*10)
        }
    }
    // BURAYI EKLEYEYİM Mİ BİLEMEDİM
    
    for (let i in ilişkiMatrisi) { 
        for (let j in ilişkiMatrisi[i]) { 
            
            // kaçan kovalayan yarıçapları simetrik SİLİNEBİLİR
            //  burada hala sıkıntı var TANIMLANMADI hatası
            ilişkiMatrisi[j][i].ufakÇap  = ilişkiMatrisi[i][j].ufakÇap
            ilişkiMatrisi[j][i].büyükÇap = ilişkiMatrisi[i][j].büyükÇap
            
        }
    }
}
