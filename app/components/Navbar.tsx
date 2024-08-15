import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='bg-green-600 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-2xl font-bold'>
          PlantID
        </Link>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' className='hover:text-green-200'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/about' className='hover:text-green-200'>
              About
            </Link>
          </li>
          <li>
            <Link href='/contact' className='hover:text-green-200'>
              Contact
            </Link>
          </li>
          <li>
            <Link href='/gallery' className='hover:text-green-200'>
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
