import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function AutoSearchBar({
  stocks,
  selected,
  setSelected,
  order,
  setOrder,
}) {
  const [query, setQuery] = useState("");

  const filteredstocks =
    query === ""
      ? stocks
      : stocks.filter((stock) =>
          stock.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full text-left bg-white  py-4 px-6 text-gray-700 leading-tight rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              displayValue={(stock) => stock.name}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={(event) => {
                setOrder({ ...order, skuID: event.target.value });
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredstocks.length === 0 && query !== "" ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredstocks.map((stock) => (
                  <Combobox.Option
                    key={stock._id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? "text-white bg-teal-600" : "text-gray-900"
                      }`
                    }
                    value={stock}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {stock.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
