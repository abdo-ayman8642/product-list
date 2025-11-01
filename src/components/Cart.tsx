import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { XMarkIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../store/useCartStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  // subscribe only to items array — component will re-render when items change
  const {items,increment,decrement,removeFromCart,clearCart} = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
            <Dialog.Panel className="w-screen max-w-md bg-white shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button onClick={onClose}>
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">Cart is empty</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                      <img src={item.imageURL} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => decrement(item.id!)} className="p-1 border rounded">
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increment(item.id!)} className="p-1 border rounded">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id!)} className="p-2 text-red-500">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
