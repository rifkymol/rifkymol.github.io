# LLM - Ringkasan Indonesia Sederhana

## Ide Utama

LLM adalah singkatan dari Large Language Model.

LLM adalah model AI besar yang bisa memahami dan membuat teks.

Cara paling sederhana untuk memahami LLM:

> LLM bekerja seperti fitur prediksi kata di keyboard HP, tapi jauh lebih pintar dan dilatih dengan data yang sangat besar.

Misalnya kamu mengetik:

> "Saya sedang belajar ..."

Keyboard mungkin menebak kata berikutnya adalah:

> "AI"

LLM juga melakukan hal seperti itu, tetapi dengan kemampuan yang jauh lebih kuat. LLM tidak hanya menebak satu kata, tapi bisa membuat kalimat, paragraf, jawaban, ringkasan, kode, dan penjelasan.

---

## 1. LLM Membuat Completion dari Prompt

Prompt adalah pertanyaan atau perintah yang kita berikan ke AI.

Completion adalah lanjutan atau jawaban yang dibuat oleh AI.

Contoh:

Prompt:

> "Jelaskan apa itu AI dengan bahasa sederhana."

Completion:

> "AI adalah teknologi yang membuat komputer bisa melakukan tugas yang biasanya membutuhkan kecerdasan manusia."

Jadi, inti kerja LLM adalah:

> Diberi prompt, lalu membuat lanjutan teks yang paling masuk akal.

### Cara Menjelaskan ke Orang Lain

Bayangkan kamu mendengar kalimat:

> "Saya mendengar anjing ..."

Kamu mungkin bisa menebak kata berikutnya:

> "menggonggong"

Kenapa?

Karena kamu tahu:

- Anjing biasanya menggonggong
- Kata "mendengar" berhubungan dengan suara
- Kalimat itu sedang membahas sesuatu yang terdengar

LLM juga belajar pola seperti itu dari banyak sekali teks.

---

## 2. Tokenization

Sebelum LLM bisa belajar dari teks, teks harus dipecah dulu menjadi bagian-bagian kecil.

Bagian kecil ini disebut token.

Token bisa berupa:

- Satu kata
- Potongan kata
- Tanda baca
- Gabungan karakter yang sering muncul

Contoh sederhana:

Kalimat:

> "I heard a dog bark"

Bisa dipecah menjadi token:

- I
- heard
- a
- dog
- bark

Setiap token diberi nomor unik.

Contoh:

Token = ID
1. I = 1
2. heard = 2
3. a = 3
4. dog = 4
5. bark = 5

### Cara Menjelaskan ke Orang Lain

Token itu seperti potongan Lego.

Kalimat panjang dibuat dari potongan-potongan kecil. LLM tidak langsung melihat teks seperti manusia, tapi melihat potongan token dan ID-nya.

---

## 3. Vector

Setelah teks dipecah menjadi token, setiap token diubah menjadi vector.

Vector adalah daftar angka.

Contoh sederhana:

> dog = [10, 3, 2]

Angka-angka ini membantu komputer mewakili makna dari sebuah token.

Manusia memahami kata "dog" sebagai hewan. Komputer tidak memahami kata seperti manusia, jadi kata itu diubah menjadi angka agar bisa dihitung.

### Cara Menjelaskan ke Orang Lain

Komputer tidak benar-benar membaca kata seperti kita.

Komputer lebih mudah bekerja dengan angka.

Jadi kata diubah menjadi angka, lalu AI menghitung hubungan antar angka itu.

---

## 4. Positional Encoding

Urutan kata itu penting.

Contoh:

> "Anjing menggigit manusia"

Berbeda artinya dengan:

> "Manusia menggigit anjing"

Kata-katanya mirip, tapi urutannya berubah, maka artinya berubah.

Karena itu LLM perlu tahu posisi setiap token dalam kalimat.

Positional encoding adalah cara untuk memberi informasi posisi ke model.

### Cara Menjelaskan ke Orang Lain

Token memberi tahu "kata apa".

Positional encoding memberi tahu "kata itu ada di urutan ke berapa".

LLM butuh dua-duanya supaya bisa memahami kalimat dengan benar.

---

## 5. Transformer

Transformer adalah arsitektur model yang banyak dipakai dalam LLM modern.

Tugas transformer adalah membantu model memahami hubungan antar token.

Misalnya pada kalimat:

> "I heard a dog bark"

Kata "bark" lebih berhubungan dengan "dog" dan "heard" dibandingkan dengan "I" atau "a".

Transformer membantu model menemukan hubungan seperti itu.

### Dua Bagian Penting Transformer

#### Encoder

Encoder membantu membuat pemahaman dari token.

Ia melihat token dan konteks di sekitarnya, lalu menghasilkan embedding.

#### Decoder

Decoder membantu memprediksi token berikutnya.

Ia memakai informasi dari token sebelumnya untuk menebak lanjutan teks yang paling mungkin.

### Catatan Sederhana

Dalam materi asli, transformer dijelaskan dengan encoder dan decoder.

Untuk pemula, cukup ingat:

> Transformer adalah mesin utama yang membantu LLM memahami hubungan antar kata dan memprediksi kata berikutnya.

---

## 6. Attention

Attention adalah teknik yang membuat model tahu bagian mana dari kalimat yang perlu lebih diperhatikan.

Contoh:

> "I heard a dog bark"

Saat model melihat kata "bark", kata yang penting adalah:

- heard
- dog

Kata "I" dan "a" tetap ada, tapi pengaruhnya lebih kecil.

Jadi attention memberi bobot yang berbeda pada token-token di sekitar.

### Cara Menjelaskan ke Orang Lain

Attention itu seperti saat kamu membaca kalimat dan fokus ke kata yang paling membantu memahami maksud kalimat.

Kamu tidak memberi perhatian yang sama ke semua kata.

LLM juga begitu. Ia belajar kata mana yang lebih penting dalam konteks tertentu.

---

## 7. Multi-Head Attention

Multi-head attention berarti model melihat hubungan antar token dari beberapa sudut pandang sekaligus.

Contoh sederhana:

Saat membaca kalimat, model bisa memperhatikan:

- Hubungan makna
- Hubungan tata bahasa
- Hubungan posisi kata
- Hubungan kata kerja dan subjek

Semua itu bisa diperiksa secara paralel.

### Cara Menjelaskan ke Orang Lain

Kalau attention seperti satu orang yang fokus membaca kalimat, multi-head attention seperti beberapa orang membaca kalimat yang sama dengan fokus berbeda.

Satu fokus ke makna, satu fokus ke urutan, satu fokus ke hubungan antar kata.

Hasilnya digabung agar pemahaman model lebih kuat.

---

## 8. Embedding

Embedding adalah vector yang sudah mengandung informasi makna dan konteks.

Awalnya token hanya punya angka acak.

Setelah diproses oleh transformer, angka itu menjadi lebih bermakna.

Contoh:

Kata:

- dog
- puppy
- cat

Biasanya punya embedding yang lebih dekat karena semuanya berhubungan dengan hewan.

Sedangkan:

- dog
- skateboard
- car

Biasanya lebih jauh karena maknanya berbeda.

### Cara Menjelaskan ke Orang Lain

Embedding itu seperti alamat makna sebuah kata di dalam ruang angka.

Kata yang maknanya mirip akan punya posisi yang dekat.

Kata yang maknanya jauh akan punya posisi yang jauh.

---

## 9. Cosine Similarity

Cosine similarity adalah cara untuk mengukur seberapa mirip dua vector.

Dalam konteks LLM, ini bisa membantu melihat apakah dua token punya makna yang mirip.

Contoh:

- "dog" dan "puppy" kemungkinan mirip
- "dog" dan "car" kemungkinan tidak terlalu mirip

### Cara Menjelaskan ke Orang Lain

Kalau embedding adalah posisi kata di peta makna, cosine similarity adalah cara mengukur apakah dua kata arahnya mirip atau tidak.

---

## 10. Predicting the Next Token

Setelah model punya embedding dan memahami hubungan antar token, model bisa memprediksi token berikutnya.

Contoh:

Prompt:

> "When my dog was a ..."

Model melihat token sebelumnya:

- When
- my
- dog
- was
- a

Lalu model menebak token berikutnya yang paling mungkin.

Jawaban yang mungkin:

> "puppy"

Kenapa bukan "skateboard"?

Karena "dog" dan "puppy" punya hubungan makna yang lebih kuat.

### Prosesnya Berulang

LLM tidak langsung membuat seluruh jawaban sekaligus.

Biasanya model memprediksi token berikutnya, lalu token itu ditambahkan ke teks.

Setelah itu model memprediksi token berikutnya lagi.

Proses ini terus berulang sampai jawaban selesai.

---

## 11. Masked Attention

Saat model dilatih untuk memprediksi token berikutnya, model tidak boleh melihat jawaban masa depan.

Masked attention membantu menyembunyikan token yang belum boleh dilihat.

Contoh:

Kalau model sedang belajar dari kalimat:

> "When my dog was a puppy"

Saat menebak kata setelah:

> "When my dog was a"

Model tidak boleh langsung melihat kata:

> "puppy"

Model harus menebak dulu. Setelah itu, hasil tebakannya dibandingkan dengan jawaban asli.

Kalau salah, model menyesuaikan bobotnya agar ke depan lebih baik.

### Cara Menjelaskan ke Orang Lain

Ini seperti latihan soal.

Kamu tidak boleh melihat kunci jawaban dulu.

Kamu jawab dulu, lalu baru dibandingkan dengan kunci jawaban.

Dari kesalahan itu, kamu belajar.

---

## Peta Singkat Materi
1. LLM = Model AI besar untuk memahami dan membuat teks 
2. Prompt = Perintah atau pertanyaan dari user 
3. Completion = Jawaban atau lanjutan teks dari AI 
4. Token = Potongan kecil dari teks 
5. Tokenization = Proses memecah teks menjadi token 
6. Vector = Bentuk angka dari token 
7. Positional Encoding = Informasi posisi token dalam kalimat 
8. Transformer = Arsitektur utama yang memahami hubungan antar token 
9. Attention = Cara model memilih bagian teks yang paling penting 
10. Multi-Head Attention = Beberapa attention yang bekerja dari sudut pandang berbeda 
11. Embedding = Vector yang sudah punya makna dan konteks 
12. Cosine Similarity = Cara mengukur kemiripan makna antar vector 
13. Decoder = Bagian yang memprediksi token berikutnya 
14. Masked Attention = Teknik agar model tidak melihat jawaban masa depan saat latihan

---

## Penjelasan Feynman Singkat

Kalau aku harus menjelaskan LLM ke teman, aku akan bilang:

LLM adalah AI besar yang dilatih untuk melanjutkan teks. Kita memberi prompt, lalu model membuat completion atau jawaban. Cara kerjanya mirip prediksi kata di keyboard HP, tapi jauh lebih kuat.

Sebelum memahami teks, LLM memecah teks menjadi token. Token bisa berupa kata, potongan kata, atau tanda baca. Setiap token diberi ID, lalu diubah menjadi vector, yaitu daftar angka.

Karena komputer bekerja dengan angka, kata-kata harus diubah menjadi angka dulu. Tapi angka biasa belum cukup. Model juga perlu tahu urutan kata, karena urutan bisa mengubah arti kalimat. Itulah fungsi positional encoding.

Setelah itu, transformer memproses token-token tersebut. Di dalam transformer ada attention, yaitu cara model menentukan kata mana yang paling penting dalam sebuah konteks. Misalnya pada kalimat "I heard a dog bark", kata "dog" dan "heard" penting untuk memahami kata "bark".

Dari proses itu, model membuat embedding. Embedding adalah vector yang sudah membawa makna. Kata yang maknanya mirip, seperti "dog" dan "puppy", akan punya embedding yang dekat. Kata yang tidak mirip, seperti "dog" dan "car", akan lebih jauh.

Setelah model memahami hubungan antar token, decoder memprediksi token berikutnya. Model menambahkan token itu ke kalimat, lalu menebak token berikutnya lagi. Proses ini berulang sampai jawaban selesai.

Saat latihan, model memakai masked attention supaya tidak melihat jawaban yang seharusnya ditebak. Jadi model belajar seperti manusia mengerjakan latihan: jawab dulu, cek jawaban, lalu perbaiki.

Kesimpulannya:

> LLM adalah AI yang belajar dari banyak teks, memecah teks menjadi token, mengubah token menjadi angka, memahami hubungan antar kata dengan attention, lalu memprediksi lanjutan teks yang paling masuk akal.

---

## Pertanyaan Latihan

Jawab dengan kata-katamu sendiri.

1. Apa itu LLM?
2. Apa itu prompt?
3. Apa itu completion?
4. Kenapa LLM mirip prediksi kata di keyboard HP?
5. Apa itu token?
6. Kenapa teks harus diubah menjadi token?
7. Apa itu vector?
8. Kenapa posisi kata penting?
9. Apa fungsi transformer?
10. Apa itu attention?
11. Apa bedanya attention dan multi-head attention?
12. Apa itu embedding?
13. Kenapa "dog" dan "puppy" bisa dianggap mirip oleh model?
14. Apa fungsi decoder?
15. Apa itu masked attention?

---

## Versi Super Singkat

LLM bekerja seperti ini:

1. User memberi prompt.
2. Teks dipecah menjadi token.
3. Token diubah menjadi angka atau vector.
4. Model memperhatikan hubungan antar token dengan attention.
5. Vector berubah menjadi embedding yang punya makna.
6. Decoder memprediksi token berikutnya.
7. Proses berulang sampai jawaban selesai.

Kalimat paling mudah diingat:

> LLM adalah mesin prediksi teks yang sangat kuat. Ia belajar dari banyak data, memahami pola bahasa, lalu menebak lanjutan teks yang paling masuk akal.
