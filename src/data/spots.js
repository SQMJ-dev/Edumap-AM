// Sample data. Every spot has content, a real place (lat, lng) and, for timeline topics, a year.
// Descriptions are for demonstration only. Verify every fact against the KSSR textbook before real use.
export const fmtYear = (y) => (y < 0 ? `${Math.floor(-y)} SM` : `${Math.floor(y)} M`)
const CHECK = '[Semak butiran ini dengan buku teks KSSR]'
const S = (id, name, place, year, yearLabel, lat, lng, summary, facts, why, glossary, quiz) =>
  ({ id, name, place, year, yearLabel, lat, lng, summary, facts: [...facts, CHECK], why, glossary: [glossary], quiz: { q: quiz[0], options: quiz[1], answer: quiz[2], explain: quiz[3] } })

// Attach a picture to a spot. The file must be in public/images/. Credit and alt text are shown on the page.
const IMG = (spot, src, alt, credit) => Object.assign(spot, { image: { src, alt, credit } })

const niah = S('niah', 'Gua Niah', 'Sarawak', null, 'Zaman prasejarah', 3.8, 113.78,
  'Gua Niah ialah antara tapak prasejarah terpenting di Asia Tenggara. Tengkorak manusia yang ditemui di sini berusia puluhan ribu tahun.',
  ['Terletak di Sarawak.', 'Penemuan di sini menunjukkan manusia telah tinggal di Borneo sejak puluhan ribu tahun lalu.'],
  'Tapak ini membantu kita memahami bagaimana manusia awal hidup dan berpindah di rantau ini.',
  ['Prasejarah', 'Zaman sebelum manusia mengenal tulisan.'],
  ['Di negeri manakah Gua Niah terletak?', ['Sabah', 'Sarawak', 'Perak', 'Pahang'], 1, 'Gua Niah terletak di Sarawak.'])
IMG(niah, 'niah-caves.jpg', 'Gua Niah di Sarawak', '[Kredit foto: nama pemilik atau lesen]')

const lenggong = S('lenggong', 'Lembah Lenggong', 'Perak', null, 'Zaman prasejarah', 5.1, 100.98,
  'Lembah Lenggong di Perak terkenal dengan penemuan “Manusia Perak”, rangka manusia prasejarah yang berusia kira-kira 11,000 tahun.',
  ['Terletak di Perak.', 'Lembah ini mempunyai banyak tapak arkeologi dari zaman Paleolitik hingga Neolitik.'],
  'Penemuan ini antara bukti penting kehidupan manusia awal di Tanah Melayu.',
  ['Arkeologi', 'Kajian tentang peninggalan masa lalu seperti bangunan dan alat.'],
  ['“Manusia Perak” ditemui di lembah yang mana?', ['Lembah Bujang', 'Lembah Lenggong', 'Lembah Klang', 'Lembah Kinta'], 1, 'Rangka “Manusia Perak” ditemui di Lembah Lenggong, Perak.'])
IMG(lenggong, 'lembah.jpg', 'Manusia Perak dijumpa di Lembang Lenggong', '[Kredit foto: nama pemilik atau lesen]' )

  const cha = S('cha', 'Gua Cha', 'Kelantan', null, 'Zaman prasejarah', 4.85, 101.95,
  'Gua Cha di Kelantan ialah tapak penempatan prasejarah yang menyimpan alat batu, tembikar dan tinggalan penghuni gua.',
  ['Terletak di Kelantan.', 'Penghuni gua menggunakan alat batu dan kemudiannya tembikar.'],
  'Tapak gua seperti ini menunjukkan cara hidup manusia awal yang tinggal di gua.',
  ['Gua', 'Rongga besar di dalam bukit atau gunung.'],
  ['Gua Cha terletak di negeri mana?', ['Kelantan', 'Kedah', 'Selangor', 'Sabah'], 0, 'Gua Cha terletak di Kelantan.'])
IMG(cha, 'gua_cha.jpg', 'Gua Cha', '[Kredit foto: nama pemilik atau lesen]' )

const bujang = S('bujang', 'Lembah Bujang', 'Kedah', 450, 'Kira-kira abad ke-5 M', 5.75, 100.45,
  'Lembah Bujang ialah kawasan arkeologi yang luas di Kedah, di sekitar Gunung Jerai. Di sini ditemui sisa candi, tembikar, manik dan alat besi yang menunjukkan wujudnya pusat perdagangan yang maju pada zaman awal.',
  ['Terletak di Kedah, berhampiran Gunung Jerai.', 'Sisa candi menunjukkan pengaruh agama Hindu-Buddha daripada India.', 'Pedagang dari India dan China singgah di pelabuhan awal di kawasan ini.'],
  'Tapak ini membuktikan bahawa Tanah Melayu sudah menjadi sebahagian daripada laluan perdagangan antarabangsa sebelum kedatangan kuasa Barat.',
  ['Candi', 'Bangunan batu untuk upacara agama.'],
  ['Di negeri manakah Lembah Bujang terletak?', ['Perak', 'Kedah', 'Johor', 'Terengganu'], 1, 'Lembah Bujang terletak di Kedah, berhampiran Gunung Jerai.'])
IMG(bujang, 'Bujang_valley.jpg', 'Lembah Bujang', '[Kredit foto: nama pemilik atau lesen]' )

  const melaka = S('melaka', 'Kesultanan Melaka', 'Melaka', 1400, 'Sekitar 1400 M', 2.19, 102.25,
  'Parameswara mengasaskan Melaka sekitar 1400. Kedudukannya yang strategik di Selat Melaka menjadikannya pelabuhan perdagangan yang sibuk.',
  ['Diasaskan oleh Parameswara.', 'Terletak di tepi Selat Melaka, laluan perdagangan utama.'],
  'Melaka menjadi contoh kerajaan Melayu yang terkenal dan berpengaruh di rantau ini.',
  ['Pelabuhan', 'Tempat kapal berlabuh dan berdagang.'],
  ['Siapakah pengasas Melaka?', ['Hang Tuah', 'Parameswara', 'Tun Perak', 'Sultan Mansur Shah'], 1, 'Parameswara mengasaskan Melaka sekitar 1400.'])
const famosa = S('famosa', 'Kota A Famosa', 'Melaka', 1511, '1511 M', 2.19, 102.25,
  'A Famosa ialah kubu yang dibina oleh Portugis di Melaka selepas mereka menawan bandar itu pada 1511 di bawah Alfonso d’Albuquerque.',
  ['Melaka jatuh kepada Portugis pada 1511.', 'Belanda kemudian menawan Melaka pada 1641.', 'Pintu Santiago ialah antara bahagian kubu yang masih tinggal.'],
  'Kejatuhan Melaka menandakan permulaan campur tangan kuasa Eropah di Tanah Melayu.',
  ['Campur tangan', 'Tindakan pihak luar yang masuk mencampuri urusan negara lain.'],
  ['Siapakah yang menawan Melaka pada 1511?', ['Belanda', 'British', 'Portugis', 'Jepun'], 2, 'Portugis menawan Melaka pada 1511 dan membina kubu A Famosa.'])
IMG(famosa, 'A_Famosa_Fortress.jpg', 'Kota A Famosa', '[Kredit foto: nama pemilik atau lesen]')

  const pangkor = S('pangkor', 'Pulau Pangkor', 'Perak', 1874, '1874 M', 4.22, 100.55,
  'Perjanjian Pangkor ditandatangani pada 1874 di Pulau Pangkor. Perjanjian ini membawa British masuk campur tangan dalam pentadbiran Perak melalui sistem Residen.',
  ['Perjanjian ditandatangani pada 1874.', 'Sultan Perak menerima seorang Residen British yang menasihati pentadbiran negeri.'],
  'Perjanjian ini menjadi permulaan pemerintahan British di negeri-negeri Melayu.',
  ['Residen', 'Pegawai British yang menasihati dan mengawal pentadbiran negeri.'],
  ['Perjanjian Pangkor ditandatangani pada tahun…', ['1511', '1874', '1915', '1957'], 1, 'Perjanjian Pangkor ditandatangani pada 1874.'])
const tambunan = S('tambunan', 'Tambunan', 'Sabah', 1894, '1894–1900 M', 5.68, 116.37,
  'Tambunan di Sabah dikaitkan dengan Mat Salleh, pemimpin yang menentang pentadbiran Syarikat Borneo Utara British. Penentangan ini berlangsung sekitar 1894 hingga 1900.',
  ['Mat Salleh memimpin penentangan terhadap Syarikat Borneo Utara British.', 'Antara sebab penentangan ialah cukai dan peraturan baharu ke atas penduduk tempatan.', 'Beliau terkorban dalam pertempuran di Tambunan pada 1900.'],
  'Penentangan ini menunjukkan bahawa penduduk tempatan berani mempertahankan hak mereka daripada kuasa asing.',
  ['Penentangan', 'Tindakan menentang pemerintahan kuasa asing.'],
  ['Siapakah pemimpin penentangan di Tambunan?', ['Tok Janggut', 'Mat Salleh', 'Dol Said', 'Rosli Dhobi'], 1, 'Mat Salleh memimpin penentangan terhadap Syarikat Borneo Utara British.'])
const pasirputeh = S('pasirputeh', 'Pasir Puteh', 'Kelantan', 1915, '1915 M', 5.83, 102.4,
  'Pasir Puteh di Kelantan ialah tempat tercetusnya penentangan Tok Janggut pada 1915 terhadap pentadbiran British. Penduduk tidak berpuas hati dengan sistem cukai yang baharu.',
  ['Tok Janggut ialah nama gelaran bagi Haji Mohd Hassan bin Munas.', 'Penentangan bermula kerana bantahan terhadap cukai tanah yang baharu.', 'Beliau terkorban dalam pertempuran dengan pasukan British pada 1915.'],
  'Peristiwa ini antara bukti penentangan rakyat terhadap penjajahan di negeri-negeri Melayu.',
  ['Cukai', 'Bayaran wajib kepada pemerintah.'],
  ['Siapakah yang memimpin penentangan di Pasir Puteh pada 1915?', ['Mat Salleh', 'Rentap', 'Tok Janggut', 'Datuk Bahaman'], 2, 'Tok Janggut memimpin penentangan di Pasir Puteh, Kelantan, pada 1915.'])
const kl = S('kl', 'Kuala Lumpur', 'Wilayah Persekutuan', 1957, '31 Ogos 1957', 3.15, 101.69,
  'Kemerdekaan Tanah Melayu diisytiharkan di Kuala Lumpur pada 31 Ogos 1957. Tunku Abdul Rahman melaungkan “Merdeka!” sebanyak tujuh kali di Stadium Merdeka.',
  ['Bendera British diturunkan dan Bendera Persekutuan Tanah Melayu dinaikkan di Dataran Merdeka pada tengah malam.', 'Tunku Abdul Rahman menjadi Perdana Menteri pertama.'],
  'Tarikh ini menamatkan pemerintahan British di Tanah Melayu dan diingati setiap tahun sebagai Hari Kebangsaan.',
  ['Kemerdekaan', 'Bebas daripada pemerintahan kuasa asing.'],
  ['Bilakah kemerdekaan Tanah Melayu diisytiharkan?', ['16 September 1963', '31 Ogos 1957', '1 Julai 1957', '31 Ogos 1963'], 1, 'Kemerdekaan Tanah Melayu diisytiharkan pada 31 Ogos 1957.'])
const kuching = S('kuching', 'Kuching', 'Sarawak', 1963.55, '22 Julai 1963', 1.55, 110.35,
  'Sarawak memperoleh pemerintahan sendiri pada 22 Julai 1963 sebelum bersama Tanah Melayu, Sabah dan Singapura membentuk Malaysia pada 16 September 1963.',
  ['Sarawak berkerajaan sendiri pada 22 Julai 1963.', 'Malaysia dibentuk pada 16 September 1963.'],
  'Peristiwa ini membawa Sarawak ke dalam pembentukan Malaysia.',
  ['Berkerajaan sendiri', 'Mentadbir negeri sendiri.'],
  ['Malaysia dibentuk pada…', ['31 Ogos 1957', '22 Julai 1963', '16 September 1963', '31 Ogos 1963'], 2, 'Malaysia dibentuk pada 16 September 1963.'])
const kk = S('kk', 'Kota Kinabalu', 'Sabah', 1963.66, '31 Ogos 1963', 5.98, 116.07,
  'Sabah, yang dahulunya Borneo Utara, memperoleh pemerintahan sendiri pada 31 Ogos 1963 sebelum membentuk Malaysia.',
  ['Sabah berkerajaan sendiri pada 31 Ogos 1963.', 'Sabah menyertai Malaysia pada 16 September 1963.'],
  'Sabah menjadi sebahagian daripada Malaysia yang baharu.',
  ['Pembentukan', 'Proses membentuk atau menubuhkan sesuatu.'],
  ['Sabah menyertai Malaysia pada bulan apa?', ['Julai', 'Ogos', 'September', 'Disember'], 2, 'Sabah menyertai Malaysia pada 16 September 1963.'])

const klang = S('klang', 'Penghulu Klang', 'Klang', null, 'Kira-kira 1445 [anggaran]', 3.04, 101.45,
  'Tun Perak berasal dari Klang dan menjadi penghulu di sana. Beliau memimpin orang Klang menentang serangan tentera Siam ke atas Melaka.',
  ['Beliau memimpin penduduk Klang menentang tentera Siam.', 'Kejayaan itu menarik perhatian pemerintah Melaka.'],
  'Keberanian dan kebijaksanaan beliau membawanya ke jawatan yang lebih tinggi.',
  ['Penghulu', 'Ketua yang mengetuai sebuah kawasan atau kampung.'],
  ['Tun Perak berasal dari kawasan mana?', ['Klang', 'Kuantan', 'Muar', 'Kuala Terengganu'], 0, 'Tun Perak berasal dari Klang.'])
const bendahara = S('bendahara', 'Dilantik menjadi Bendahara', 'Melaka', null, 'Kira-kira 1456 [anggaran]', 2.19, 102.25,
  'Tun Perak dilantik menjadi Bendahara, pembesar yang paling tinggi dalam pentadbiran Melaka.',
  ['Bendahara ialah ketua pentadbiran dan penasihat utama Sultan.', 'Beliau berkhidmat dalam pemerintahan beberapa orang sultan Melaka.'],
  'Jawatan ini memberi beliau peranan besar dalam kejayaan Melaka.',
  ['Bendahara', 'Pembesar tertinggi yang mentadbir negeri bagi pihak Sultan.'],
  ['Apakah jawatan tertinggi pembesar yang disandang Tun Perak?', ['Laksamana', 'Bendahara', 'Temenggung', 'Penghulu'], 1, 'Tun Perak dilantik menjadi Bendahara Melaka.'])
const batupahat = S('batupahat', 'Mempertahankan Melaka daripada Siam', 'Batu Pahat', null, 'Kira-kira 1456 [anggaran]', 1.85, 102.93,
  'Tun Perak mengetuai pertahanan Melaka apabila Siam menyerang. Tentera Melaka berjaya menewaskan tentera Siam di Batu Pahat.',
  ['Siam menyerang Melaka pada pertengahan abad ke-15.', 'Strategi Tun Perak membawa kemenangan kepada Melaka.'],
  'Kemenangan ini menjamin keselamatan Melaka sebagai pelabuhan yang aman.',
  ['Strategi', 'Rancangan yang teliti untuk mencapai kemenangan.'],
  ['Di manakah tentera Melaka menewaskan tentera Siam?', ['Batu Pahat', 'Kuala Lumpur', 'Kota Bharu', 'Ipoh'], 0, 'Tentera Melaka menewaskan tentera Siam di Batu Pahat.'])
const empayar = S('empayar', 'Memperluas pengaruh Melaka', 'Melaka', null, 'Zaman Sultan Mansur Shah [semak tahun]', 2.19, 102.25,
  'Pada zaman Sultan Mansur Shah, Tun Perak membantu memperluas wilayah Melaka. Beberapa kawasan di Semenanjung dan Sumatera berada di bawah pengaruh Melaka.',
  ['Antara kawasan yang ditakluki ialah Pahang dan Kampar.', 'Melaka berkembang menjadi pusat perdagangan yang kuat.'],
  'Melaka menjadi kerajaan yang kuat dan berpengaruh di rantau ini.',
  ['Empayar', 'Wilayah luas di bawah pengaruh satu kerajaan.'],
  ['Pada zaman sultan manakah Melaka berkembang dengan bantuan Tun Perak?', ['Sultan Mansur Shah', 'Sultan Mahmud Shah', 'Sultan Ahmad Shah', 'Parameswara'], 0, 'Tun Perak berkhidmat pada zaman Sultan Mansur Shah.'])
const tunPerak = { name: 'Tun Perak', role: 'Bendahara Melaka', bio: 'Tun Perak ialah Bendahara Melaka yang terkenal kerana kebijaksanaan dan keberaniannya. Beliau membantu menjaga keselamatan Melaka dan memperluas pengaruhnya pada abad ke-15. Nilai murni: berani, bijaksana dan setia kepada negara.' }
IMG(tunPerak, 'Tun_Perak.jpg', 'Tun Perak', '[Kredit foto: nama pemilik atau lesen]' )

const agong = {
  id: 'agong', name: 'Yang di-Pertuan Agong', template: 'konsep', spots: [],
  intro: 'Yang di-Pertuan Agong ialah Ketua Negara Malaysia. Baginda dipilih daripada kalangan Raja-Raja Melayu dan bertindak mengikut Perlembagaan.',
  cards: [
    { title: 'Siapa Yang di-Pertuan Agong?', img: 'Gambar Yang di-Pertuan Agong', text: 'Yang di-Pertuan Agong ialah Ketua Negara Malaysia. Malaysia mengamalkan sistem Raja Berperlembagaan, iaitu raja bertindak mengikut Perlembagaan negara.' },
    { title: 'Bagaimana dipilih?', img: 'Rajah giliran pemilihan', text: 'Baginda dipilih oleh Majlis Raja-Raja daripada kalangan sembilan orang Raja Melayu secara bergilir. Tempoh pemerintahan ialah lima tahun.' },
    { title: 'Apakah tugasnya?', img: 'Gambar upacara diraja', text: 'Antara tugas baginda ialah menjadi Panglima Tertinggi Angkatan Tentera, melantik Perdana Menteri dan merasmikan persidangan Parlimen.' },
  ],
  glossary: [['Raja Berperlembagaan', 'Raja yang bertindak mengikut Perlembagaan negara.'], ['Majlis Raja-Raja', 'Majlis yang dianggotai Raja-Raja Melayu dan memilih Yang di-Pertuan Agong.'], ['Titah', 'Ucapan atau perintah daripada raja.']],
  quizzes: [
    { q: 'Berapa lamakah tempoh jawatan Yang di-Pertuan Agong?', options: ['Tiga tahun', 'Lima tahun', 'Tujuh tahun', 'Seumur hidup'], answer: 1, explain: 'Yang di-Pertuan Agong memerintah selama lima tahun.' },
    { q: 'Siapakah yang memilih Yang di-Pertuan Agong?', options: ['Perdana Menteri', 'Majlis Raja-Raja', 'Rakyat', 'Mahkamah'], answer: 1, explain: 'Majlis Raja-Raja memilih Yang di-Pertuan Agong.' },
  ],
}

// Pictures for the other templates (uncomment and add the files to public/images/):
// IMG(tunPerak, 'tun-perak.jpg', 'Potret Tun Perak', 'Kredit: ...')   // round portrait on the Tokoh page
// IMG(agong.cards[0], 'agong.jpg', 'Yang di-Pertuan Agong', 'Kredit: ...')   // card 1 on the Konsep page

const soon = (id, name) => ({ id, name, soon: true })
export const TOPICS = {
  4: [
    { id: 'prasejarah', name: 'Zaman Prasejarah', template: 'place', spots: [niah, lenggong, cha] },
    { id: 'kerajaan-awal', name: 'Kerajaan Melayu Awal', template: 'timeline', min: 0, max: 1500, spots: [bujang, melaka] },
    soon('s1', 'Mari Belajar Sejarah'), soon('s2', 'Zaman Air Batu'), { id: 'tokoh-melaka', name: 'Tokoh Terbilang Melaka', template: 'tokoh', person: tunPerak, spots: [klang, bendahara, batupahat, empayar] },
  ],
  5: [
    { id: 'campur-tangan', name: 'Campur Tangan Kuasa Asing', template: 'timeline', min: 1500, max: 1920, spots: [famosa, pangkor, tambunan, pasirputeh] },
    soon('s4', 'Warisan Negara Kita'), agong,
  ],
  6: [
    { id: 'kemerdekaan', name: 'Kemerdekaan dan Pembentukan Malaysia', template: 'timeline', min: 1955, max: 1965, spots: [kl, kuching, kk] },
    soon('s6', 'Kita Rakyat Malaysia'),
  ],
}
