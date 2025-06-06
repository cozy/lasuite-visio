import { layoutStore } from '@/stores/layout'
import { css } from '@/styled-system/css'
import { Heading } from 'react-aria-components'
import { text } from '@/primitives/Text'
import { Button, Div } from '@/primitives'
import { RiArrowLeftLine, RiCloseLine } from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import { ParticipantsList } from './controls/Participants/ParticipantsList'
import { useSidePanel } from '../hooks/useSidePanel'
import { ReactNode } from 'react'
import { Chat } from '../prefabs/Chat'
import { Effects } from './effects/Effects'
import { Admin } from './Admin'
import { Tools } from './Tools'
import { Info } from './Info'

type StyledSidePanelProps = {
  title: string
  children: ReactNode
  onClose: () => void
  isClosed: boolean
  closeButtonTooltip: string
  isSubmenu: boolean
  onBack: () => void
}

const StyledSidePanel = ({
  title,
  children,
  onClose,
  isClosed,
  closeButtonTooltip,
  isSubmenu = false,
  onBack,
}: StyledSidePanelProps) => (
  <div
    className={css({
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'box.border',
      backgroundColor: 'box.bg',
      color: 'box.text',
      borderRadius: 8,
      flex: 1,
      position: 'absolute',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      margin: '1.5rem 1.5rem 1.5rem 0',
      padding: 0,
      gap: 0,
      right: 0,
      top: 0,
      bottom: '80px',
      width: '360px',
      transition: '.5s cubic-bezier(.4,0,.2,1) 5ms',
    })}
    style={{
      transform: isClosed ? 'translateX(calc(360px + 1.5rem))' : 'none',
    }}
  >
    <Heading
      slot="title"
      level={1}
      className={text({ variant: 'h2' })}
      style={{
        paddingLeft: '1.5rem',
        paddingTop: '1rem',
        display: isClosed ? 'none' : 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      {isSubmenu && (
        <Button
          variant="secondaryText"
          size={'sm'}
          square
          className={css({ marginRight: '0.5rem' })}
          onPress={onBack}
        >
          <RiArrowLeftLine size={20} />
        </Button>
      )}
      {title}
    </Heading>
    <Div
      position="absolute"
      top="5"
      right="5"
      style={{
        display: isClosed ? 'none' : undefined,
      }}
    >
      <Button
        invisible
        variant="tertiaryText"
        size="xs"
        onPress={onClose}
        aria-label={closeButtonTooltip}
        tooltip={closeButtonTooltip}
      >
        <RiCloseLine />
      </Button>
    </Div>
    {children}
  </div>
)

type PanelProps = {
  isOpen: boolean
  children: React.ReactNode
  keepAlive?: boolean
}

const Panel = ({ isOpen, keepAlive = false, children }: PanelProps) => (
  <div
    style={{
      display: isOpen ? 'inherit' : 'none',
      flexDirection: 'column',
      overflow: 'hidden',
      flexGrow: 1,
    }}
  >
    {keepAlive || isOpen ? children : null}
  </div>
)

export const SidePanel = () => {
  const {
    activePanelId,
    isParticipantsOpen,
    isEffectsOpen,
    isChatOpen,
    isSidePanelOpen,
    isToolsOpen,
    isAdminOpen,
    isInfoOpen,
    isSubPanelOpen,
    activeSubPanelId,
  } = useSidePanel()
  const { t } = useTranslation('rooms', { keyPrefix: 'sidePanel' })

  return (
    <StyledSidePanel
      title={t(`heading.${activeSubPanelId || activePanelId}`)}
      onClose={() => {
        layoutStore.activePanelId = null
        layoutStore.activeSubPanelId = null
      }}
      closeButtonTooltip={t('closeButton', {
        content: t(`content.${activeSubPanelId || activePanelId}`),
      })}
      isClosed={!isSidePanelOpen}
      isSubmenu={isSubPanelOpen}
      onBack={() => (layoutStore.activeSubPanelId = null)}
    >
      <Panel isOpen={isParticipantsOpen}>
        <ParticipantsList />
      </Panel>
      <Panel isOpen={isEffectsOpen}>
        <Effects />
      </Panel>
      <Panel isOpen={isChatOpen} keepAlive={true}>
        <Chat />
      </Panel>
      <Panel isOpen={isToolsOpen}>
        <Tools />
      </Panel>
      <Panel isOpen={isAdminOpen}>
        <Admin />
      </Panel>
      <Panel isOpen={isInfoOpen}>
        <Info />
      </Panel>
    </StyledSidePanel>
  )
}
