import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-elevated border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-black italic tracking-tighter uppercase">
                FAT <span className="text-race-red">KARTING</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm">
              Pushing the limits of amateur karting. Join the fastest growing league in the UK and experience professional-grade racing.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase mb-6 text-sm tracking-widest text-race-red">League</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/hubs" className="hover:text-white transition-colors">Hubs</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Standings</Link></li>
              <li><Link href="/paddock" className="hover:text-white transition-colors">Driver Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase mb-6 text-sm tracking-widest text-electric-blue">Connect</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} FAT Karting League. Built with Electro Architecture.</p>
          <p className="mt-4 md:mt-0">Design by Stitch • Powered by Next.js</p>
        </div>
      </div>
    </footer>
  );
}
