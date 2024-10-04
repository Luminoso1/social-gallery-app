import Sidebar from '@/components/sidebar'

export default function PrimaryLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main className='ml-12 px-10 py-8 pb-16'>{children}</main>
    </div>
  )
}
