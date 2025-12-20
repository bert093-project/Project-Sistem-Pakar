export default function Home() {
  return (
    <main>
      <div className='flex items-center m-8 h-170'>
        <div className='flex flex-col'>
          <h1 className='text-[32px] font-semibold'>Sistem Pakar Diagnosa Kerusakan Laptop/PC</h1>
          <h1 className='text-[32px] font-semibold'>mengunakan Certainty Factor berbasis web</h1>
          <p className='text-[28px]'>Pilih gejala yang kamu alami, lalu sistem akan menghitung tingkat keyakinan</p>
          <p className='text-[28px]'>(Certainty Factor) dan Memberi rekomendasi solusi.</p>
          <div className='pt-10'>
            <a className='bg-black text-white font-medium py-2 px-4 rounded-full' href="/diagnose_page">Periksa disini</a>
          </div>
        </div>
      </div>
    </main>
  );
}