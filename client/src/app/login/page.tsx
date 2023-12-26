export default function Login() {
  return (
    <main className="h-screen w-8/12 mx-auto py-16">
      <div className="flex h-full shadow-lg rounded-3xl shadow-zinc-300 bg-white">
        <div className="w-3/5 relative">
          <img
            src="https://hcmut.edu.vn/img/carouselItem/59840602.jpg?t=59840602"
            alt="university illustration"
            className="h-full object-cover object-center rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="w-2/5 flex flex-col items-center">
          <img src="logo.svg" alt="software logo" className="w-40"/>
        </div>
      </div>
    </main>
  );
}
