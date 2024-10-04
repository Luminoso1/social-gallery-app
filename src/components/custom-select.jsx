'use client'
import { Controller } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

export const CustomSelect = ({ data, label, name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {data && (
              <div>
                {data.map((value) => (
                  <SelectItem key={value} value={value} className='capitalize'>
                    {value}
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
