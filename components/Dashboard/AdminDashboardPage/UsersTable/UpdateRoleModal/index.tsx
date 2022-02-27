import { memo, useEffect, useState } from 'react'
import Modal from '@elements/Modal'
import { CheckField, Form } from '@elements/FormElements'
import { Button, GhostButton } from '@elements/Button'
import { ModalProps, Role, User } from '@lib/types'
import { roles } from '@lib/global'

const colorCheck = (role: Role) => {
  switch (role.toLowerCase()) {
    case 'president':
      return 'text-success'
    case 'vice_president':
      return 'text-success/80'
    case 'secretary':
      return 'text-success/60'
    case 'treasurer':
      return 'text-success/40'
    case 'tech_lead':
      return 'text-accent'
    case 'marketing_officer':
      return 'text-accent/80'
    case 'ocm':
      return 'text-accent/60'
    case 'first_year_rep':
      return 'text-accent/40'
    case 'admin':
      return 'text-warning'
    case 'hlm':
      return 'text-warning/60'
    default:
      return 'text-primary'
  }
}

const UpdateRoleModal = ({ user: id, ...props }: UpdateRoleModalProps) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const getUser = async () => {
      setUser(await (await fetch(`/api/users?clerkID=${id}`)).json())
    }
    id && getUser()
  }, [id])

  return (
    <Modal
      size='xs'
      heading={`Update ${props.name}'s Roles`}
      open={props.isOpen}
      onClose={props.closeModal}
    >
      <Form className='m-0' onSubmit={props.handleSubmit}>
        {roles.map(role => (
          <CheckField
            key={role}
            label={
              <span className='capitalize'>{role.split('_').join(' ')}</span>
            }
            name={role}
            defaultChecked={user?.roles?.includes(role)}
            className={colorCheck(role)}
          />
        ))}
        <div className='flex justify-between'>
          <Button fill type='submit'>
            Update
          </Button>
          <GhostButton onClick={props.closeModal}>Cancel</GhostButton>
        </div>
      </Form>
    </Modal>
  )
}

interface UpdateRoleModalProps extends ModalProps {
  user: string
  name: string
  loading: boolean
  handleSubmit: (values: Record<Role, boolean>) => Promise<void>
}

export default memo(UpdateRoleModal)
