[index.html](https://github.com/user-attachments/files/28231282/index.html)
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veresiye Defterim</title>
    <style>
        body { font-family: sans-serif; background-color: #f8f9fa; padding: 15px; padding-bottom: 90px; max-width: 500px; margin: auto; }
        .kutu { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 15px; }
        
        input, select, button { width: 100%; padding: 12px; margin: 8px 0; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; font-size: 16px; }
        button { cursor: pointer; font-weight: bold; border: none; color: white; }
        .btn-yesil { background-color: #28a745; }
        .btn-kirmizi { background-color: #dc3545; }
        .btn-mavi { background-color: #007bff; }
        .btn-gri { background-color: #6c757d; }
        
        /* Liste tasarımı */
        .liste-kart { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 12px 0; cursor: pointer; transition: background 0.2s; }
        .liste-kart:hover { background-color: #f1f3f5; }
        .isim-kutu { font-weight: bold; color: #333; }
        .sayfa-kutu { font-size: 12px; color: #666; }
        .bakiye-kutu { font-weight: 800; font-size: 16px; padding: 5px 10px; border-radius: 5px; }
        
        /* Alt Menü */
        .alt-menu { position: fixed; bottom: 0; left: 0; width: 100%; background: white; display: flex; border-top: 1px solid #ddd; z-index: 100; }
        .alt-menu button { flex: 1; padding: 15px; border: none; background: none; font-weight: bold; color: #555; border-radius: 0; }
        .alt-menu button.aktif { color: #28a745; background: #e8f5e9; border-top: 3px solid #28a745; }

        .ust-bilgi { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .ust-bilgi button { width: auto; padding: 8px 15px; margin: 0; background-color: #6c757d; }

        .oneriler-listesi { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ccc; border-radius: 5px; max-height: 220px; overflow-y: auto; z-index: 1000; margin: -5px 0 0 0; padding: 0; list-style: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .oneriler-listesi li { padding: 12px; border-bottom: 1px solid #eee; cursor: pointer; font-weight: bold; color: #333; }
        .oneriler-listesi li:hover { background-color: #e8f5e9; }
        
        /* Müşteri Özel Detay Kartları */
        .detay-satir { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }
        .detay-sol { display: flex; flex-direction: column; }
        .detay-urun { font-weight: bold; color: #333; }
        .detay-tarih { font-size: 11px; color: #999; margin-top: 2px; }
        .detay-sag { font-weight: bold; font-size: 15px; }
    </style>
</head>
<body>

    <div id="ekranGiris" class="kutu" style="margin-top: 50px; text-align: center;">
        <h2>🔐 Sisteme Giriş</h2>
        <input type="email" id="emailGiris" placeholder="E-posta Adresi">
        <input type="password" id="sifreGiris" placeholder="Şifre">
        <button class="btn-mavi" onclick="girisYap()">Giriş Yap</button>
    </div>

    <div id="anaUygulama" style="display: none;">
        
        <div class="ust-bilgi">
            <span id="kullaniciBilgi" style="font-weight: bold; color: #007bff;"></span>
            <button onclick="cikisYap()">Çıkış Yap</button>
        </div>

        <div id="ekranArama">
            <input type="text" id="aramaKutusu" oninput="canliArama()" placeholder="🔍 İsim veya sayfa no ile ara...">
            <div class="kutu" style="margin-top:15px;">
                <div id="musteriListesi">Yükleniyor...</div>
            </div>
        </div>

        <div id="ekranIslem" style="display: none;">
            <div class="kutu">
                <h3>💸 Borç & Ödeme Gir</h3>
                <div style="position: relative; margin-bottom: 8px;">
                    <input type="text" id="musteriAramaIslem" oninput="islemMusteriAra()" placeholder="🔍 İsim veya Sayfa No yazın..." autocomplete="off">
                    <ul id="islemMusteriOnerileri" class="oneriler-listesi" style="display: none;"></ul>
                </div>
                <input type="hidden" id="secilenMusteriId">
                
                <input type="text" id="islemAciklama" placeholder="Ne aldı? (Örn: 2 Ekmek, Sigara veya Peşinat)">
                <input type="number" id="islemMiktari" placeholder="Tutar (TL)">
                
                <div style="display: flex; gap: 10px;">
                    <button class="btn-kirmizi" onclick="islemYap('borc')">Borç Yaz</button>
                    <button class="btn-yesil" onclick="islemYap('odeme')">Ödeme Al</button>
                </div>
            </div>
        </div>

        <div id="ekranEkleme" style="display: none;">
            <div class="kutu">
                <h3>➕ Yeni Müşteri Kaydet</h3>
                <input type="text" id="musteriAd" placeholder="Müşterinin Adı Soyadı">
                <input type="number" id="sayfaNo" placeholder="Defterdeki Sayfa Numarası">
                <button class="btn-yesil" onclick="musteriEkle()">Müşteriyi Kaydet</button>
            </div>

            <div class="kutu" style="border-top: 3px solid #dc3545; margin-top: 25px;">
                <h3 style="color: #dc3545;">🗑️ Müşteri Sil</h3>
                <p style="font-size: 13px; color: #666; margin: 0 0 10px 0;">Defterden tamamen kaldırmak istediğiniz müşteriyi seçin.</p>
                
                <div style="position: relative; margin-bottom: 8px;">
                    <input type="text" id="silMusteriArama" oninput="silMusteriAra()" placeholder="🔍 Silinecek isim veya sayfa no yazın..." autocomplete="off">
                    <ul id="silMusteriOnerileri" class="oneriler-listesi" style="display: none;"></ul>
                </div>
                <input type="hidden" id="secilenSilMusteriId">
                
                <button class="btn-kirmizi" onclick="musteriSil()">Müşteriyi Tamamen Sil</button>
            </div>
        </div>

        <div id="ekranDetay" style="display: none;">
            <button class="btn-gri" onclick="sekmeDegistir('arama')">⬅️ Kişilere Geri Dön</button>
            <div class="kutu" style="margin-top: 15px; background: #e8f5e9; border: 1px solid #c8e6c9;">
                <h2 id="detayMusteriAdi" style="margin: 0; color: #1b5e20;">-</h2>
                <p id="detayMusteriSayfa" style="margin: 5px 0 0 0; color: #555; font-size: 14px;">Sayfa: -</p>
                <h3 id="detayMusteriBakiye" style="margin: 10px 0 0 0; font-size: 24px; color: #2e7d32;">0 ₺</h3>
            </div>
            
            <div class="kutu">
                <h4 style="margin: 0 0 10px 0; border-bottom: 2px solid #eee; padding-bottom: 5px;">📋 Hesap Hareketleri</h4>
                <div id="musteriOzelGecmisListesi">Yükleniyor...</div>
            </div>
        </div>

        <div class="alt-menu">
            <button id="btnArama" class="aktif" onclick="sekmeDegistir('arama')">🔍 Kişiler</button>
            <button id="btnIslem" onclick="sekmeDegistir('islem')">💸 İşlem Yap</button>
            <button id="btnEkleme" onclick="sekmeDegistir('ekleme')">➕ Yeni Ekle / Sil</button>
        </div>
    </div>

    <script>
        function sekmeDegistir(sekme) {
            document.getElementById("ekranArama").style.display = sekme === 'arama' ? "block" : "none";
            document.getElementById("ekranIslem").style.display = sekme === 'islem' ? "block" : "none";
            document.getElementById("ekranEkleme").style.display = sekme === 'ekleme' ? "block" : "none";
            document.getElementById("ekranDetay").style.display = sekme === 'detay' ? "block" : "none";
            
            document.getElementById("btnArama").className = sekme === 'arama' ? "aktif" : "";
            document.getElementById("btnIslem").className = sekme === 'islem' ? "aktif" : "";
            document.getElementById("btnEkleme").className = sekme === 'ekleme' ? "aktif" : "";

            // Öneri kutularını kapat
            const oneriler = document.getElementById("islemMusteriOnerileri");
            if(oneriler) oneriler.style.display = "none";
            const silOneriler = document.getElementById("silMusteriOnerileri");
            if(silOneriler) silOneriler.style.display = "none";
        }

        window.canliArama = function() {
            const aranan = document.getElementById("aramaKutusu").value.toLowerCase();
            const satirlar = document.getElementsByClassName("musteri-satiri");
            for (let i = 0; i < satirlar.length; i++) {
                const metin = satirlar[i].innerText.toLowerCase();
                satirlar[i].style.display = metin.includes(aranan) ? "flex" : "none";
            }
        }
    </script>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
        // YENİ: deleteDoc veritabanından silme fonksiyonu eklendi
        import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, getDoc, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
        import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

        // BURAYI KENDİ BİLGİLERİNE GÖRE DOLDUR
        const firebaseConfig = {
  apiKey: "AIzaSyCezofCOBCKEVU3ip5HyUokaqcbRLFnq-g",
  authDomain: "veresiye-f8611.firebaseapp.com",
  projectId: "veresiye-f8611",
  storageBucket: "veresiye-f8611.firebasestorage.app",
  messagingSenderId: "514357633675",
  appId: "1:514357633675:web:75678bd2547582426f2a8e",
  measurementId: "G-C3F473YDT2"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);

        let aktifKullanici = null;
        let tumMusteriler = [];
        let gecmisAbonelik = null; 

        onAuthStateChanged(auth, (user) => {
            if (user) {
                document.getElementById("ekranGiris").style.display = "none";
                document.getElementById("anaUygulama").style.display = "block";
                document.getElementById("kullaniciBilgi").innerText = "👤 " + user.email;
                aktifKullanici = user.email;
                verileriYukle();
            } else {
                document.getElementById("ekranGiris").style.display = "block";
                document.getElementById("anaUygulama").style.display = "none";
                aktifKullanici = null;
            }
        });

        window.girisYap = async function() {
            const email = document.getElementById("emailGiris").value;
            const sifre = document.getElementById("sifreGiris").value;
            try { await signInWithEmailAndPassword(auth, email, sifre); } 
            catch (error) { alert("Giriş Başarısız! E-posta veya şifre hatalı."); }
        }

        window.cikisYap = async function() { await signOut(auth); }
        
        function verileriYukle() {
            onSnapshot(collection(db, "musteriler"), (snapshot) => {
                const liste = document.getElementById("musteriListesi");
                liste.innerHTML = "";
                tumMusteriler = [];
                
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    const bakiye = data.bakiye || 0;
                    const renk = bakiye > 0 ? "color: #dc3545;" : "color: #28a745;";
                    
                    tumMusteriler.push({ id: docSnap.id, isim: data.isim, sayfa: data.sayfa });

                    liste.innerHTML += `
                    <div class="liste-kart musteri-satiri" onclick="musteriDetayAc('${docSnap.id}', '${data.isim}', ${bakiye}, '${data.sayfa}')">
                        <div>
                            <div class="isim-kutu">${data.isim.toUpperCase()}</div>
                            <div class="sayfa-kutu">Sayfa: ${data.sayfa}</div>
                        </div>
                        <div class="bakiye-kutu" style="${renk}">${bakiye} ₺</div>
                    </div>`;
                });
            });
        }

        window.musteriDetayAc = function(id, isim, bakiye, sayfa) {
            sekmeDegistir('detay');
            
            document.getElementById("detayMusteriAdi").innerText = isim.toUpperCase();
            document.getElementById("detayMusteriSayfa").innerText = "Defter Sayfa No: " + sayfa;
            
            const bakiyeKutusu = document.getElementById("detayMusteriBakiye");
            bakiyeKutusu.innerText = bakiye + " ₺";
            bakiyeKutusu.style.color = bakiye > 0 ? "#dc3545" : "#28a745";

            const liste = document.getElementById("musteriOzelGecmisListesi");
            liste.innerHTML = "Yükleniyor...";

            if(gecmisAbonelik) gecmisAbonelik();

            const q = query(collection(db, "islemler"), where("musteriId", "==", id));
            
            gecmisAbonelik = onSnapshot(q, (snapshot) => {
                liste.innerHTML = "";
                
                if(snapshot.empty) {
                    liste.innerHTML = "<p style='color:#777; text-align:center; margin:10px 0;'>Bu müşteriye ait henüz bir hareket yok.</p>";
                    return;
                }

                let islemlerDizi = [];
                snapshot.forEach(docSnap => {
                    islemlerDizi.push(docSnap.data());
                });
                islemlerDizi.sort((a, b) => b.tarih - a.tarih);

                islemlerDizi.forEach((data) => {
                    const tarihObje = new Date(data.tarih);
                    const tarihMetni = tarihObje.toLocaleDateString('tr-TR') + " " + tarihObje.toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
                    
                    const islemRengi = data.tur === 'borc' ? 'color:#dc3545;' : 'color:#28a745;';
                    const islemOnEki = data.tur === 'borc' ? '+' : '-';
                    const aciklamaMetni = data.aciklama ? data.aciklama : (data.tur === 'borc' ? "Borç Kaydı" : "Ödeme");

                    liste.innerHTML += `
                    <div class="detay-satir">
                        <div class="detay-sol">
                            <span class="detay-urun">${aciklamaMetni.toUpperCase()}</span>
                            <span class="detay-tarih">${tarihMetni} | Yapan: ${data.kullanici.split('@')[0]}</span>
                        </div>
                        <div class="detay-sag" style="${islemRengi}">
                            ${islemOnEki}${data.miktar} ₺
                        </div>
                    </div>`;
                });
            });
        }

        window.islemMusteriAra = function() {
            const aranan = document.getElementById("musteriAramaIslem").value.toLowerCase();
            const onerilerKutusu = document.getElementById("islemMusteriOnerileri");
            onerilerKutusu.innerHTML = "";

            if (aranan.trim() === "") {
                onerilerKutusu.style.display = "none";
                document.getElementById("secilenMusteriId").value = "";
                return;
            }

            const filtrelenmis = tumMusteriler.filter(m => m.isim.toLowerCase().includes(aranan) || m.sayfa.toString().includes(aranan));

            if (filtrelenmis.length === 0) {
                onerilerKutusu.innerHTML = `<li style="color: #999; cursor: default;">Kişi bulunamadı</li>`;
                onerilerKutusu.style.display = "block";
                return;
            }

            filtrelenmis.forEach(m => {
                const li = document.createElement("li");
                li.innerText = `${m.isim.toUpperCase()} (Sayfa: ${m.sayfa})`;
                li.onclick = function() {
                    document.getElementById("musteriAramaIslem").value = m.isim.toUpperCase();
                    document.getElementById("secilenMusteriId").value = m.id;
                    onerilerKutusu.style.display = "none";
                };
                onerilerKutusu.appendChild(li);
            });
            onerilerKutusu.style.display = "block";
        }

        // YENİ: Silinecek müşteriyi arama fonksiyonu
        window.silMusteriAra = function() {
            const aranan = document.getElementById("silMusteriArama").value.toLowerCase();
            const onerilerKutusu = document.getElementById("silMusteriOnerileri");
            onerilerKutusu.innerHTML = "";

            if (aranan.trim() === "") {
                onerilerKutusu.style.display = "none";
                document.getElementById("secilenSilMusteriId").value = "";
                return;
            }

            const filtrelenmis = tumMusteriler.filter(m => m.isim.toLowerCase().includes(aranan) || m.sayfa.toString().includes(aranan));

            if (filtrelenmis.length === 0) {
                onerilerKutusu.innerHTML = `<li style="color: #999; cursor: default;">Kişi bulunamadı</li>`;
                onerilerKutusu.style.display = "block";
                return;
            }

            filtrelenmis.forEach(m => {
                const li = document.createElement("li");
                li.innerText = `${m.isim.toUpperCase()} (Sayfa: ${m.sayfa})`;
                li.onclick = function() {
                    document.getElementById("silMusteriArama").value = m.isim.toUpperCase();
                    document.getElementById("secilenSilMusteriId").value = m.id;
                    onerilerKutusu.style.display = "none";
                };
                onerilerKutusu.appendChild(li);
            });
            onerilerKutusu.style.display = "block";
        }

        window.musteriEkle = async function() {
            const ad = document.getElementById("musteriAd").value.toLowerCase();
            const sayfa = document.getElementById("sayfaNo").value;
            if(ad === "" || sayfa === "") return alert("Lütfen boş alan bırakmayın!");
            try {
                await addDoc(collection(db, "musteriler"), { isim: ad, sayfa: sayfa, bakiye: 0 });
                document.getElementById("musteriAd").value = "";
                document.getElementById("sayfaNo").value = "";
                sekmeDegistir('arama');
            } catch (error) { alert("Hata: " + error.message); }
        }

        // YENİ: Müşteriyi Tamamen Silme Fonksiyonu
        window.musteriSil = async function() {
            const id = document.getElementById("secilenSilMusteriId").value;
            const isim = document.getElementById("silMusteriArama").value;

            if(!id) return alert("Lütfen silmek istediğiniz müşteriyi listeden aratarak seçin!");

            // Esnaf dostu çift onay mekanizması
            const onay = confirm(`⚠️ DİKKAT: "${isim}" isimli müşteriyi defterden tamamen silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`);
            
            if(!onay) return;

            try {
                // Firestore'dan dokümanı kaldır
                await deleteDoc(doc(db, "musteriler", id));
                
                // Form alanlarını sıfırla
                document.getElementById("silMusteriArama").value = "";
                document.getElementById("secilenSilMusteriId").value = "";
                
                alert("Müşteri hesabı defterden başarıyla silindi.");
                sekmeDegistir('arama'); // Ana listeye at
            } catch (error) { 
                alert("Silme işlemi sırasında hata oluştu: " + error.message); 
            }
        }

        window.islemYap = async function(islemTuru) {
            const musteriId = document.getElementById("secilenMusteriId").value;
            const miktar = parseFloat(document.getElementById("islemMiktari").value);
            const musteriIsim = document.getElementById("musteriAramaIslem").value;
            const aciklama = document.getElementById("islemAciklama").value.trim(); 

            if(!musteriId) return alert("Lütfen listeden aratarak bir müşteri seçin!");
            if(isNaN(miktar) || miktar <= 0) return alert("Geçerli bir tutar giriniz!");

            try {
                const musteriRef = doc(db, "musteriler", musteriId);
                const musteriSnap = await getDoc(musteriRef);
                
                if (!musteriSnap.exists()) return alert("Müşteri bulunamadı!");
                
                const eskiBakiye = musteriSnap.data().bakiye || 0;
                const degisimMiktari = islemTuru === 'borc' ? miktar : -miktar;
                const yeniBakiye = eskiBakiye + degisimMiktari;

                await addDoc(collection(db, "islemler"), {
                    musteriId: musteriId,
                    musteriIsim: musteriIsim,
                    tur: islemTuru,
                    miktar: miktar,
                    aciklama: aciklama, 
                    eskiBakiye: eskiBakiye,
                    yeniBakiye: yeniBakiye,
                    kullanici: aktifKullanici,
                    tarih: Date.now()
                });

                await updateDoc(musteriRef, { bakiye: yeniBakiye });
                
                document.getElementById("islemMiktari").value = "";
                document.getElementById("islemAciklama").value = ""; 
                document.getElementById("musteriAramaIslem").value = "";
                document.getElementById("secilenMusteriId").value = "";
                
                alert("İşlem başarıyla kaydedildi!");
                
                musteriDetayAc(musteriId, musteriIsim, yeniBakiye, musteriSnap.data().sayfa);
            } catch (error) { alert("Hata: " + error.message); }
        }
    </script>
</body>
</html>
