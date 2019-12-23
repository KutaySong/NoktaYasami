
function draw() {    		 //  ilkin tek seçim  YAP: geçmişDenemeler
    background(0);   
    noktalar.map(n => {n.say(), n.kay()} )
    noktalar.map(n => n.çiz())
    if(!ekranaYazı) {
        if (frameCount>900) ekranaYazı= true
        else if (frameCount>480) ekranaYaz()
    }
}
nokta.prototype.çiz = function() { 
    let parlaklık = fare.sontıklanan==this.tip ? 100 : 80
    fill(renkDizgesi[this.tip],100,parlaklık)
    ellipse(floor(this.x), floor(this.y), floor(noktaÇapı/2)); 
}


function mouseWheel(event) {
    if(event.delta<0) { etkileşimiDeğiştir(1) }  //  YOHARI
    if(event.delta>0) { etkileşimiDeğiştir(0) }  //  ASAGI
}


function mousePressed() { 
    if(mouseButton === LEFT)   { 
        fare.çekimX = mouseX
        fare.çekimY = mouseY
        fare.çekimaktif = !fare.çekimaktif
        if (fare.çekimaktif)
        setTimeout(()=>{fare.çekimaktif = 0}, 5000)  // 5 sn
    }
    else if(mouseButton === CENTER ) {  // manyaklaştır bukalemun gibi renk değiştirsin 
        if (fare.sontıklanan != -1 ) fare.çekimaktif= 0
        fare.sontıklanan= -1
        for (let n of noktalar) {
            if (dist(n.x,n.y,mouseX,mouseY)<noktaÇapı/3) {
                fare.sontıklanan= n.tip
                break
            }
        }
    }  
}

function etkileşimiDeğiştir (neyana) {
    yerÇekimi *= neyana? 1.953 : 0.512 ;
    
    if (fare.sontıklanan!=-1) {
        for (let bunu in ilişkiMatrisi) {
            if (bunu == fare.sontıklanan)
            ilişkiMatrisi[fare.sontıklanan][bunu].çekimGücü *= neyana? 1.953 : 0.512 ;
            else {
                ilişkiMatrisi[fare.sontıklanan][bunu].çekimGücü *= neyana? 1.953 : 0.512 ;
                // ilişkiMatrisi[bunu][fare.sontıklanan].çekimGücü *= neyana? 1.953 : 0.512 ;
            }
        }
    } else {
        for (let iM of ilişkiMatrisi) {
            for (let jM of iM) {       
                if (iM.ID == jM.ID) {
                    jM.çekimGücü *= neyana? 1.953 : 0.512 ;
                }
                else {
                    jM.çekimGücü *= neyana? 0.512 : 1.953 ;
                }
            }
        }
    }
}

function ekranaYaz () {
    fill("white")
    stroke("blue")
    text ("mouse WHEEL up/dn : speed up/dn", 100 , 200)
    stroke("green") 
    text ("mouse CLICK : artificial gravity", 100 , 400)
    stroke("red")
    text ("middle CLICK : select family", 100, 600)
    stroke("green") 
    text ("F5 :  Refresh", 100 , 800)
    noStroke()
}