import { useState } from 'react'
import CartDrawer from '../Cart'
import Button from '../ui/Button'
import { useCartStore } from '../../store/useCartStore';

function Navbar() {

      const [open, setOpen] = useState(false);
  const { items } = useCartStore();

  return (
    <div className="flex justify-end gap-2 w-full my-10">

      <button onClick={() => setOpen(true)} className="relative">
          🛒
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {items.length}
            </span>
          )}
        </button>


      <CartDrawer open={open} onClose={() => setOpen(false)} />
      </div>
  )
}

export default Navbar