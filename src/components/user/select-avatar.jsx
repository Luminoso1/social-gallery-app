import { Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

export const CustomSelectAvatar = ({ data, label, name, control, user }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={user.avatar}
          value={user.avatar}
        >
          <SelectTrigger className='focus:ring-0 focus:ring-offset-0 border-none size-32 rounded-full overflow-hidden focus:border-none p-0 mx-auto'>
            <img src={field.value || user.avatar} alt={user.nick} />
          </SelectTrigger>
          <SelectContent className='!translate-x-0 !translate-y-2'>
            {data && (
              <div className='grid grid-cols-3'>
                {data.map(({ name, url }) => (
                  <SelectItem key={name} value={url} className='capitalize'>
                    <img
                      src={url}
                      alt={name}
                      className='size-20 rounded-full'
                    />
                  </SelectItem>
                ))}
              </div>
            )}
          </SelectContent>
        </Select>
      )}
    />
  )
}
