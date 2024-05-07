'use client'

import { CreateUser } from '@/lib/actions/userActions';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import {useRouter} from 'next/navigation'

const Demo = ({userId} : {userId : string}) => {

  const [loading ,setLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username : ''
    },
  });

  const onSubmit = async (values : {username :string}) =>{
    console.log(values.username);
    
    setLoading(true)
    await CreateUser(values.username , userId).then((res : {status : string}) => {
        if(res.status === "OK"){
            router.push('/user/me')
        }
    }
    )
  }

  return (
    <Box maw={340} mx="auto" >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Please enter a username"
          placeholder="please pick a formal username"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Demo;