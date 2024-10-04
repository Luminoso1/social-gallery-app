'use client'
import { useState, useCallback, useEffect } from 'react'
import { DropzoneSection } from '@/components/dropzone'
import { MAX_FILES, MAX_SIZE } from '@/lib/utils'
import useUploaderStore from '@/store/uploader'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { FileList } from '@/components/uploader/list'
import { toast } from 'sonner'

export default function Uploader() {
  const [loading, setLoading] = useState(false)

  // const { data, addFiles, reset } = useUploaderStore()

  const { data, addFiles, reset } = useUploaderStore()

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const newData = acceptedFiles.map((file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })

        return {
          title: '',
          date: '',
          country: '',
          city: '',
          description: '',
          file
        }
      })
      addFiles(newData)

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`)
        })
      }
    },
    [addFiles]
  )

  useEffect(() => {
    return () => {
      if (!data) return
      data.forEach(({ file }) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [])

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      const formData = new FormData()

      data.forEach((value, index) => {
        const { file, ...res } = value
        const info = res
        // only string or file
        formData.append(`values`, JSON.stringify(info))
        formData.append(`photos`, file)
      })

      console.log('FORM DATA', formData)

      const res = await fetch('/api/posts/create', {
        method: 'POST',
        body: formData
      })

      const resData = await res.json()

      if (res.ok) {
        reset()
        toast.success('Succesfully created 😀')
        return
      } else {
        console.error('Error:', resData.message)
        toast.error('Error created 😀', resData.message)
      }

      // navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('SERVER ERROR', error.message)
    } finally {
      setLoading(false)
    }
  }

  const isDisable = data.length >= MAX_FILES
  return (
    <div>
      <DropzoneSection
        onDrop={onDrop}
        isDisable={isDisable}
        maxFiles={MAX_FILES}
        maxSize={MAX_SIZE}
      />

      <FileList data={data} />

      {data.length > 0 && (
        <Button
          onClick={handleSubmit}
          className='my-10 py-8 w-full'
          disabled={loading}
        >
          {loading && <Loader2 className='animate-spin' />}
          Save
        </Button>
      )}
    </div>
  )
}
