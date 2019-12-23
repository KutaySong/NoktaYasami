
function güçHesapla (tipben, tipo, uzaklık) {
    let benimGücüm = 0;
    const min = ilişkiMatrisi[tipben][tipo].ufakÇap
    const tepeGücü = ilişkiMatrisi[tipben][tipo].çekimGücü
    if (uzaklık > min) {
        let max = ilişkiMatrisi[tipben][tipo].büyükÇap
        let tepeYeri = 0.5 *(min+max)
        if (uzaklık>tepeYeri) {
            benimGücüm = tepeGücü * (max-uzaklık)/(max-tepeYeri)           
        } else if (uzaklık<tepeYeri) {
            benimGücüm = tepeGücü * (uzaklık-min)/(tepeYeri-min)           
        }
    } else if (uzaklık < min) {    // hiperbolik it
        benimGücüm = 2 * min * (-(1/(min+2)) + (1/(uzaklık+2)))
        // benimGücüm = 1 * abs(tepeGücü) * uzaklık / min
    }
    return benimGücüm
}

nokta.prototype.say = function() { 
    
    // toplam etkiyen hızı bul önce
    for (let n of noktalar) {
        if (n.ID == this.ID) continue
        let dx = (this.x-n.x)
        let dy = (this.y-n.y)
        let uzaklık = sqrt(dx*dx + dy*dy)
        
        if ( uzaklık < ilişkiMatrisi[this.tip][n.tip].büyükÇap ) {
            let erk = güçHesapla (this.tip, n.tip, uzaklık)
            this.hızX += erk * dx / uzaklık
            this.hızY += erk * dy / uzaklık
        } 
    }
    // EKSTRA: mouse tıklandığında ekstra çekim eklenebilir
    if (fare.çekimaktif) {
        if (fare.sontıklanan==-1 || this.tip ==fare.sontıklanan) {
            const dx = (this.x-fare.çekimX)
            const dy = (this.y-fare.çekimY)
            const uzaklık = sqrt(dx*dx + dy*dy)
            this.hızX -= abs(2*itimÇekim) * dx / uzaklık
            this.hızY -= abs(2*itimÇekim) * dy / uzaklık        
        } 
    }
}

nokta.prototype.kay = function() { 
    // collision olabiliyor
    this.x += this.hızX
    this.y += this.hızY

    // hızı düşür (sürtünme)
    this.hızX *= 0.8
    this.hızY *= 0.8

    if (this.x > innerWidth-60) this.hızX = -1 * this.hızX;
    if (this.x < 20 )           this.hızX = -1 * this.hızX; 
    if (this.y > innerHeight-70)this.hızY = -1 * this.hızY; 
    if (this.y < 20 )           this.hızY = -1 * this.hızY; 
}