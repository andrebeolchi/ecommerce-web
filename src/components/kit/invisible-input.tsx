import { cn } from '~/lib/utils'

import { Input } from '~/components/ui/input'

export const InvisibleInput = ({
  className,
  ...props
}: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <Input
    {...props}
    className={cn(
      'border-0 bg-transparent focus:ring-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none drop-shadow-none min-w-fit',
      className
    )}
  />
)
