export default function MenuBar({ signedIn }: MenuBarProps) {
    const navigation = signedIn ? signedInNavigation : signedOutNavigation;
  
    const renderNavLink = (item: { name: string; to: string; disabled?: boolean }) => {
      const baseClassName = "rounded-md px-3 py-2 text-sm font-medium";
      const activeClassName = "bg-gray-900 text-white";
      const inactiveClassName = "text-gray-300 hover:bg-gray-700 hover:text-white";
      const disabledClassName = "opacity-50 cursor-not-allowed";
  
      if (item.disabled) {
        return (
          <span
            key={item.name}
            className={classNames(baseClassName, inactiveClassName, disabledClassName)}
          >
            {item.name}
          </span>
        );
      }
  
      return (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            classNames(
              baseClassName,
              isActive ? activeClassName : inactiveClassName
            )
          }
        >
          {item.name}
        </NavLink>
      );
    };
  
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {/* ... rest of your component ... */}
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map(renderNavLink)}
          </div>
        </div>
        {/* ... rest of your component ... */}
        <DisclosurePanel
          className="sm:hidden origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          transition
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) =>
              item.disabled ? (
                <span
                  key={item.name}
                  className={classNames(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    'text-gray-300 opacity-50 cursor-not-allowed'
                  )}
                >
                  {item.name}
                </span>
              ) : (
                <CloseButton
                  key={item.name}
                  as={NavLink}
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    classNames(
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )
                  }
                >
                  {item.name}
                </CloseButton>
              )
            )}
          </div>
        </DisclosurePanel>
        {/* ... rest of your component ... */}
      </Disclosure>
    );
  }