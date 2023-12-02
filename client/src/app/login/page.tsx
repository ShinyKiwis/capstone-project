export default function Login() {
  return (
    <main className="h-screen w-9/12 mx-auto py-16">
      <div className="flex h-full shadow-lg rounded-3xl shadow-zinc-300 bg-white">
        <div className="w-2/6"></div>
        <div className="w-4/6 relative">
          <img
            src="https://hcmut.edu.vn/img/carouselItem/59840602.jpg?t=59840602"
            alt="university illustration"
            className="h-full object-cover object-center rounded-tr-3xl rounded-br-3xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
          />
        </div>
      </div>
    </main>
  );
}
