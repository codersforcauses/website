import { memo } from 'react'
import Modal from '@elements/Modal'
import { ModalProps } from '@helpers/types'

const TermsModal = (props: ModalProps) => (
  <Modal
    heading='Terms and Conditions'
    open={props.isOpen}
    onClose={props.closeModal}
  >
    <div className='leading-relaxed legal-content'>
      <p className='mb-4'>
        Welcome to Coders for Causes! We&apos;re glad you&apos;re here.
      </p>
      <p className='mb-4'>
        This website, www.codersforcauses.org (the &quot;<strong>site</strong>
        &quot;), is owned and operated by Coders for Causes or cfc in short, and
        our affiliates (&quot;<strong>Coders for Causes</strong>&quot;, &quot;
        <strong>cfc</strong>&quot;, &quot;<strong>we</strong>&quot; or &quot;
        <strong>us</strong>&quot;). By using the site or services provided on
        the site, you agree to be bound by the following Terms of Service, as
        updated from time to time (collectively, the &quot;
        <strong>Terms</strong>&quot;). Please read them carefully. If you don’t
        agree to these Terms, you may not sign up or use our services.
      </p>
      <div className='pl-4 ml-6'>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>
          Signing up
        </h3>
        <ol className='pl-4'>
          <li>
            In order to use most Services, you must register for or authenticate
            into a Coders for Causes account. When you use our application
            program interfaces (&quot;API&quot;), each request to an API must
            include one of your account&apos;s unique API keys.
          </li>
          <li>
            You must ensure that that user username and password is kept
            confidential. You will accept responsibility for all activities that
            occur under your username or password. We may disable your username
            and password if you breach any of the policies or terms governing
            your use of our website or any other contractual obligation you owe
            to us.
          </li>
        </ol>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>
          Services
        </h3>
        <ol className='pl-4'>
          <li>
            CFC may provide you services including, but not limited to, the
            attendance and participation in events.
          </li>
          <li>
            CFC reserves the exclusive right to terminate your access to these
            services upon violation of the terms.
          </li>
        </ol>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>
          Copyright and Trademarks
        </h3>
        <ol className='pl-4'>
          <li>
            All documents on this site incorporate a link clarifying the
            copyright status of the document. This link appears at the foot of
            the page, along with the CFC contact details.
          </li>
          <li>
            CFC holds the copyright to all original material produced and
            displayed on this site. Users may not copy or reproduce the original
            material displayed on this site without the express written consent
            of CFC.
          </li>
        </ol>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>
          Acceptable Use
        </h3>
        <ol className='pl-4'>
          <li>
            You must use the website in a lawful manner, and must obey all laws,
            rules, and regulations (&quot;Laws&quot;) applicable to your use of
            the website. As applicable, this may include compliance with both
            domestic and international Laws.
          </li>
        </ol>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>APIs</h3>
        <ol className='pl-4'>
          <li>
            CFC has developed and provides access to the APIs that may be used
            to access various services. You may use the APIs solely as described
            in the Documentation.
          </li>
        </ol>
        <h3 className='mb-2 font-mono text-xl font-black list-heading'>
          Right to Amend
        </h3>
        <ol className='pl-4'>
          <li>
            We have the right to change or add to the terms of this Agreement at
            any time, and to change, delete, discontinue, or impose conditions
            on use of the Services by posting such changes on our website or any
            other website we maintain or own. We may provide you with Notice of
            any changes through the Dashboard, via email, or through other
            means. Your use of the Services, APIs, or Data after we publish any
            such changes on our website, constitutes your acceptance of the
            terms of the modified Agreement.
          </li>
        </ol>
      </div>
    </div>
  </Modal>
)
export default memo(TermsModal)
