export default function Footer() {
  return (
    <footer className="bg-neutral-900 mt-auto text-neutral-200 px-10 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div>
          <h6 className="mb-3 font-semibold uppercase text-sm tracking-wider">Services</h6>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Branding</li>
            <li className="hover:text-white cursor-pointer">Design</li>
            <li className="hover:text-white cursor-pointer">Marketing</li>
            <li className="hover:text-white cursor-pointer">Advertisement</li>
          </ul>
        </div>

        <div>
          <h6 className="mb-3 font-semibold uppercase text-sm tracking-wider">Company</h6>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Jobs</li>
            <li className="hover:text-white cursor-pointer">Press kit</li>
          </ul>
        </div>

        <div>
          <h6 className="mb-3 font-semibold uppercase text-sm tracking-wider">Legal</h6>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Terms of use</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
            <li className="hover:text-white cursor-pointer">Cookie policy</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
