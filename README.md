( English description below     )
( Project Name: Particle Life   )


# NE YAPAR ?                                
10x10'luk bir tabloda her rengin diğer renklere nasıl tepki vereceği önceden belirlenir.
Bu tepki belli mesafeden itme-çekme ve vektörel kuvvet uygulama şeklindedir.
Her renk kendi rengini çeker.

![Alt Text](images/EK1.jpg?raw=true "EkranKesiti")

![Alt Text](images/EK2.jpg?raw=true "EkranKesiti")


## Etkileşim

1. Fare Sol Tık:    5 saniyelik geçici yerçekimi oluşturur.
2. Fare Tekerlek:   Nokta etkileşimlerini hızlandırır yavaşlatır.
3. Fare Orta Tık:   Bir renge ait tüm noktaları seçer (#1 #2 bunlarda çalışır)


## Harezmik Yöntem
basit tekrar-içinde-tekrar taraması:
    for <tüm noktalar>
        for <tüm diğer noktalar>
            etkiyecek gücü hesapla
            toplam kuvvete ekle
    kuvveti hıza çevirerek ekle



# WHAT FOR ?

Inspired by "The Particle Life". Recreated in JS

![Alt Text](images/EK1.jpg?raw=true "EkranKesiti")

![Alt Text](images/EK2.jpg?raw=true "EkranKesiti")


## User IO

1. Mouse Left Click:    Creates an artificial gravity for 5 secs
2. Mouse wheel:         Speed/up down interaction of all particles
3. Mouse Middle Click:  Select a particle family  (for #1 and #2)


## Algorithm :
simple for-in-a-for loop:

    for <all particles>
        for <all other particles>
            calculate force between
            add to net force
    apply force as gravity