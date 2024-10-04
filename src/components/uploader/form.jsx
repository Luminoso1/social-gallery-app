'use client'
import { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import useUploaderStore from '@/store/uploader'
import { CITIES, COUNTRIES } from '@/lib/utils'
import { CustomSelect } from '../custom-select'
import { useForm } from 'react-hook-form'
import { DatePicker } from '../date-picker'
import { Calendar } from '../ui/calendar'

export default function Form({ editSelected }) {
  const { selectedFile } = useUploaderStore()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: selectedFile
  })

  // if selectedFile exists - reset it with the data (defaultValues)
  useEffect(() => {
    if (selectedFile) {
      reset(selectedFile)
    }
  }, [selectedFile, reset])

  const onSubmit = (data) => {
    data.file = selectedFile.file
    editSelected(data)
  }

  return (
    <div className='max-w-4xl mx-auto p-4 mb-10'>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            className='py-6'
            {...register('title', {
              maxLength: { value: 100, message: 'Max 100 characters' }
            })}
          />
          {errors.title && (
            <span className='text-red-500 font-semibold'>
              {errors.title.message}
            </span>
          )}
        </div>
        <div className='grid lg:grid-cols-12 gap-4'>
          <fieldset className='col-span-3'>
            <Label>Info</Label>
            <div className='flex flex-col gap-y-6 gap-x-10'>
              <DatePicker control={control} name='date' />
              <CustomSelect
                data={COUNTRIES}
                label='Country'
                control={control}
                name='country'
              />
              <CustomSelect
                data={CITIES}
                control={control}
                name='city'
                label='City'
              />
            </div>
          </fieldset>
          <div className='col-span-9 min-h-96'>
            <Label>Description</Label>
            <Textarea
              className='h-full resize-none'
              {...register('description', {
                maxLength: { value: 400, message: 'Max 400 characters' }
              })}
            />
            {errors.description && (
              <span className='text-red-500 font-semibold'>
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        <div className='mt-10 pt-10'>
          <Button type='submit' className='w-44 '>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
