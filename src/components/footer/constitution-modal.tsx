import snarkdown from "snarkdown"

import { DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"

const ConstitutionModal = () => {
  //   const data = await fetch(
  //     "https://raw.githubusercontent.com/codersforcauses/cfc-constitution/master/Constitution.md",
  //     { cache: "force-cache" },
  //   )
  //   const md = await data.text()
  //   const html = snarkdown(md)
  const html = snarkdown(`# CONSTITUTION of the Coders for Causes

<style>
.legal-content {
counter-reset: paragraph;
margin-left: 1.5rem;
padding-left: 1rem;
line-height: 1.625;
}
.list-heading {
margin-bottom: 0.5rem;
font-size: 1rem;
line-height: 1.75rem;
font-weight: 700;
}
.legal-content .list-heading,
li {
position: relative;
}
.legal-content .list-heading:after {
position: absolute;
top: 0;
padding-right: 1rem;
counter-increment: paragraph;
content: counter(paragraph, decimal-leading-zero) '';
right: 100%;
}
.legal-content .list-heading:before {
content: '';
background-color: black;
position: absolute;
top: 0;
left: -10px;
display: block;
height: 100%;
width: 0.125rem;
}
.dark .legal-content .list-heading:before {
  content: '';
  background-color: white;
}
.legal-content ul {
list-style-type: circle;
}
.legal-content ol {
counter-reset: section;
margin-bottom: 1rem;
padding-left: 1.5rem;
}
.legal-content ol > li:before {
content: counters(paragraph, '') '.' counters(section, '.') ' ';
counter-increment: section;
position: absolute;
top: 0;
right: 100%;
padding-right: 1rem;
}
.pad-left {
  padding-left: 1rem;
}
</style>

<div class='legal-content'>
<h3 class='list-heading font-mono'>Name</h3>
<ol role='list'>
<li>The formal name of the club shall be Coders for Causes.</li>
<li>The club may also choose to go by CFC.</li>
</ol>
<h3 class='list-heading font-mono'>Objectives</h3>
<ol role='list'>
<li>
To encourage and facilitate:
<ul class='pad-left' role='list'>
<li>Student software development projects at the University of WA.</li>
<li>To become and remain affiliated to Societies Council.</li>
<li>
To encourage and promote cooperation between the Club and other affiliated societies representative of University interests.
</li>
<li>
To do all such things as would appear necessary and proper for the benefit or advancement of members of the Club.
</li>
</ul>
</li>
<li>
The property and income of the society shall be applied solely towards the promotion of the objectives of the club and no part of that property or income may be paid or otherwise distributed, directly or indirectly, to members, except in good faith and in the promotion of those objectives.
</li>
</ol>
<h3 class='list-heading font-mono'>Ordinary Membership</h3>
<ol role='list'>
<li>
Ordinary membership shall be confined to:
<ul class='pad-left' role='list'>
<li>Members of the Guild</li>
<li>Associates of the Guild</li>
<li>Honorary Life Associates of the Guild</li>
<li>Members of the University Senate</li>
<li>Members of the University Staff</li>
<li>Students enrolled at the University of Western Australia.</li>
</ul>
</li>
<li>Any potential member that meets the requirements in 3.1 has the right to join the club.</li>
</ol>
<h3 class='list-heading font-mono'>Associateship of the club</h3>
<ol role='list'>
<li>
The Club in General Meeting may from time to time admit persons to associateship that are, or have been:
<ul class='pad-left' role='list'>
<li>Members of the Guild</li>
<li>Associates of the Guild</li>
<li>Honorary Life Associates of the Guild</li>
<li>Members of the University Senate</li>
<li>Members of the University Staff</li>
<li>Students enrolled at the University of Western Australia.</li>
</ul>
</li>
</ol>
<h3 class='list-heading font-mono'>Subscriptions</h3>
<ol role='list'>
<li>The annual subscription for ordinary membership shall be an absolute minimum of $4.</li>
<li>
Guild members shall receive a minimum $2 discount on yearly subscription fees and $1 on half-year subscription fees.
</li>
</ol>
<h3 class='list-heading font-mono'>Honorary Life Members</h3>
<ol role='list'>
<li>
The Club may in General Meeting by two-thirds majority of those present and voting confer Honorary Life Membership upon any member who has performed outstanding service to the Club.
</li>
</ol>
<h3 class='list-heading font-mono'>Primacy of Ordinary Members</h3>
<ol role='list'>
<li>
Members other than Ordinary Members shall not:
<ul class='pad-left' role='list'>
<li>Be voting members of the Club.</li>
<li>Nominate candidates for the offices and Committee of the Club.</li>
<li>Become or remain office bearers of the Club.</li>
<li>But shall otherwise have all the rights and privileges of ordinary membership.</li>
</ul>
</li>
</ol>
<h3 class='list-heading font-mono'>Meeting of the Club</h3>
<ol role='list'>
<li>
The Club shall hold its Annual General Meeting in March of each academic year. There shall be one Ordinary General Meeting(s) of the club in each academic semester.
<ol class='pad-left'>
<li>The Club will hold its inaugural Annual General Meeting in March.</li>
</ol>
</li>
<li>The Committee may at any time call a Special Meeting of the Club.</li>
<li>
The Secretary shall forthwith call a Special Meeting upon receiving a written requisition from at least 10 financial ordinary members of the Club, and such a meeting shall be held no later than ten days immediately following receipt of such a requisition.
</li>
<li>
If the Secretary fails to call the meeting within that time, any of the signatories of the requisition may do so. Any business set out in the requisition shall have priority over all the other business.
</li>
</ol>
<h3 class='list-heading font-mono'>Provisions Governing General Meetings</h3>
<ol role='list'>
<li>
The Secretary shall cause written notice of any General Meeting to be posted on the Guild notice boards, or in Guild mailing services, at least seven days before the date appointed for that meeting.
</li>
<li>
No General Meeting may be held while a Guild General Meeting is in progress. This shall not apply where written notice of the meeting was given before written notice of the Guild General Meeting. Any such meeting being conducted in contravention thereof shall disband immediately on the order of disciplinary officer of the Guild.
</li>
<li>The quorum of General Meeting shall consist of 10 Financial Ordinary Membership for the time being.</li>
<li>
All General Meeting of the Club shall be conducted in accordance with the procedure prescribed in the Standing Rules and Orders of the Guild Council.
</li>
<li>
Any General Meetings of the club involving an election must be supervised by at least one Returning Officer who shall:
<ol role='list'>
<li>Not be contesting the election</li>
<li>Be elected by the committee before nominations are declared open</li>
<li>Be confirmed by the members at the General Meeting before conducting the election</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Patron</h3>
<ol role='list'>
<li>
The Club may, at the Annual General Meeting, elect a patron who shall, if they indicate their willingness to do so, hold office until the succeeding Annual General Meeting; nominations shall close at that meeting.
</li>
</ol>
<h3 class='list-heading font-mono'>Nominations</h3>
<ol role='list'>
<li>
At least seven days before the Annual General Meeting, the Secretary shall call for nominations for the Executive Office Bearers and Committee of the Club. Nominations shall close at the commencement of that meeting or earlier if stated in the notice.
</li>
<li>Included in the same notice shall be details of the Annual General Meeting.</li>
</ol>
<h3 class='list-heading font-mono'>Executive Office Bearers</h3>
<ol role='list'>
<li>
The Executive Office Bearers of the Club shall be elected by the Ordinary Members of the Club at the Annual General Meeting and shall consist of, in order of seniority:
<ul class='pad-left' role='list'>
<li>The President</li>
<li>The Vice-President</li>
<li>The Technical Lead</li>
<li>The Secretary</li>
<li>The Treasurer</li>
</ul>
</li>
<li>These members will be representatives of the appropriate Guild Sub-council(s) and Guild Meetings.</li>
<li>
Only financial Ordinary Members of the Club who are also members of the Guild shall be eligible for election as Executive Office Bearers.
</li>
<li>Election shall be conducted by optional preferential ballot for each office in the order shown above.</li>
<li>A Candidate defeated for one office may stand for any office lower on the list.</li>
<li>The powers and duties of Executive Office Bearers are defined in Articles 21-24.</li>
<li>
No Executive Office Bearer may hold an Executive position simultaneously within the club or with another University of WA Club. In the event it does happen, The Executive Office Bearer must step down from their Executive Position in any of Clubs.
</li>
<li>
The Committee in meeting may dismiss an Elected Office-Bearer where, in the opinion of three quarters of the members of the Committee present and voting, that Elected Office-Bearer has:
<ol role='list'>
<li>Consistently failed adequately to discharge the duties of that position; or</li>
<li>Been absent from three Committee Meetings without providing a reasonable explanation; and</li>
<li>Been given at least seven days’ notice of that Committee Meeting; and</li>
<li>Been accorded the opportunity to be present and to speak at that Committee Meeting.</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>The Committee</h3>
<ol role='list'>
<li>
The Committee of the Club shall only consist of:
<ol role='list'>
<li>The Executive Office Bearers;</li>
<li>
The Ordinary Committee who shall consist of:
<ul class='pad-left' role='list'>
<li>1 Marketing Officer</li>
<li>6 Ordinary Committee Members</li>
<li>1 Fresher Representative</li>
</ul>
and be elected by the financial Ordinary Members of the Club by optional preferential ballot of the Annual General Meeting subsequent to the election of Office Bearers.
</li>
<li>The Immediate Past President.</li>
Only the person who held the Elected Office Bearer position of President immediately preceding the commencement of the current President‘s term shall be appointed Immediate Past President.
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Duration of Office</h3>
<ol role='list'>
<li>
The Executive Office Bearers and the Ordinary Committee members shall remain in office until the next Annual
General Meeting.
</li>
<li>
If an Ordinary Committee Member fails to arrive to a meeting without a valid reason, he/she shall gain a strike. If the same member gains three strikes, he/she shall be removed from the position.
</li>
<li>
If the Client Officer fails to fulfil his/her role, he/she shall be subject to the same rules as that of an Executive Office Bearer outlined in Article 12.8 of this Constitution.
</li>
</ol>
<h3 class='list-heading font-mono'>Vacancies</h3>
<ol role='list'>
<li>
If an Office Bearer resigns or ceases to hold office for any reason the remaining members of the Committee shall forthwith fill the vacancy so created by appointing thereto a member of the Committee from the Ordinary Membership, subject to review at the next General Meeting.
</li>
<li>
The committee shall therefore have the power to appoint a financial member of the club as an interim Ordinary Committee Member to fill the vacancy.
</li>
<li>
Newly appointed Office Bearers will be ratified at the next General Meeting of the club, which shall be held no later than 2 months after the appointment/s.
</li>
</ol>
<h3 class='list-heading font-mono'>Committee Meetings</h3>
<ol role='list'>
<li>The Committee shall meet at such times and places as the President shall determine.</li>
<li>
The Secretary shall cause all members of the Committee to receive seven days’ notice before the date fixed for the meeting together with an agenda of the business to be discussed.
</li>
<li>
The Secretary shall forthwith call a Special Meeting of the Committee upon receiving a written requisition from at least two members thereof, and such a Special Meeting shall be held not later than seven days immediately following receipt of requisition.
</li>
<li>
If the Secretary fails to call the meeting within that time, any one of the members signing the requisition may do so. Any business set out in the requisition shall have priority over all other business.
</li>
</ol>
<h3 class='list-heading font-mono'>Quorum and Procedure of Committee</h3>
<ol role='list'>
<li>The quorum of the Committee shall be 5 of whom at least two shall be Office Bearers.</li>
<li>
All meetings of the Committee shall be conducted in accordance with the procedure prescribed in the Standing Rules and Orders of the Guild Council.
</li>
</ol>
<h3 class='list-heading font-mono'>Power of Committee</h3>
<p>
Subject to this Constitution, the Committee shall be responsible to the Club in General Meeting for giving effect to the Objectives of the Club as set out in Article 2 and elsewhere in this Constitution and for carrying on its everyday business, and without prejudice to the generality of the foregoing, have the power to:
</p>
<ol role='list'>
<li>
Acquire and dispose of property; dispose of monies; open banking accounts; and enter into contracts. Unless acting under a special enabling resolution of General Meeting, however, the Committee shall not borrow or raise money or incur debts or liabilities on behalf of or in the name of the Club to a greater amount than five dollars for each and every then existing financial Ordinary Member of the Club.
</li>
<li>
Make regulations for the orderly and proper management of the affairs of the Club, ensuring that no regulation is inconsistent or repugnant with this Constitution.
</li>
<li>
Make, alter or repeal By-Laws and impose fines for the breach therefore. All By-Laws and any alterations or amendment therefore shall be subject to ratification by Societies Council and Guild Council before coming into force. The maximum fine imposed may not exceed five dollars.
</li>
</ol>
<h3 class='list-heading font-mono'>Chair</h3>
<ol role='list'>
<li>The President shall have the right to take the Chair at any meeting of the Club or of the Committee.</li>
<li>
If the President is absent or does not wish to exercise his right at any meeting, that right shall develop upon the Vice President.
</li>
<li>
In the event of absence of both the President and the Vice President, or in event of them both not wishing to exercise their right, that meeting shall elect its own Chair.
</li>
</ol>
<h3 class='list-heading font-mono'>President</h3>
<ol role='list'>
<li>
In addition to any provisions set out elsewhere in this Constitution or in any By-Laws or Regulations made hereunder, it shall be the duty of the President to:
<ol role='list'>
<li>
Coordinate and supervise the work of the Executive Office Bearers, subject to the authority of the Club in General Meeting.
</li>
<li>
See that all Office-Bearers are conversant with the Constitution and their respective Duties and Responsibilities
</li>
<li>Generally carry out the policy of the Club.</li>
<li>Report on the status of the club to the ordinary members at all general meetings.</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Vice-President</h3>
<ol role='list'>
<li>
In addition to any provisions set out elsewhere in the Constitution or in any By-Laws or Regulations made hereunder, it shall be the duty of the Vice-President to:
<ol role='list'>
<li>
Seek, engage and maintain client relationships, as well as source projects, and oversee their delivery.
</li>
<li>Assist the President wherever possible.</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Technical Lead</h3>
<ol role='list'>
<li>
In addition to any provisions set out elsewhere in the Constitution or in any By-Laws or Regulations made hereunder, it shall be the duty of the Technical Lead:
<ol role='list'>
<li>To advise the Committee on technical and development related matters.</li>
<li>To ensure workshop and presentation content is accurate and correct.</li>
<li>To conduct code reviews and assist with project development if requested.</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Secretary</h3>
<ol role='list'>
<li>
In addition to any provisions set out elsewhere in the Constitution or in any By-Laws or Regulations made hereunder, it shall be the duty of the Secretary:
<ol role='list'>
<li>
To record all proceedings of the Club and the Committee in a Club Minute Book which they shall cause to be provided for that purpose.
</li>
<li>
To conduct and keep copies of all correspondence of the Club:
<ul class='pad-left' role='list'>
<li>
To supply the Secretary of the Societies Council before the end of the first academic semester the information required to be recorded in the Guild register of the University societies.
</li>
<li>
To notify the Secretary of the Societies Council within fourteen days of the alterations in the foregoing information.
</li>
<li>
To lodge with the Secretary of the Societies Council a copy of the Constitution and any By-Laws made under its authority.
</li>
</ul>
</li>
<li>
To notify the Secretary of the Societies Council within fourteen days from the making therefore of any alterations to this Constitution of such By-Laws.
</li>
<li>
To notify the Secretary of the Societies Council of any apologies at least four days before meetings of the council in each calendar year.
</li>
<li>
In the event of the Club being de-registered, to present to the Societies Council Secretary within thirty days a duly audited statement of the financial position of the Club together with a copy of the resolution, which may have been passed by the Club as to the disposition of its funds.
</li>
</ol>
</li>
</ol>
<h3 class='list-heading font-mono'>Treasurer</h3>
<ol role='list'>
<li>
In addition to any provisions set out elsewhere in the Constitution or in any By-Laws or Regulations made hereunder, it shall be the duty of the Treasurer:
<ul class='pad-left' role='list'>
<li>
Keep proper books of account dealing with the property and finances of the Club and to furnish the Committee with such accounts and information relating to the finances and property of the Club as the Committee from time to time require.
</li>
<li>
Arrange and be responsible for handling of the petty cash and to render an account to each Committee member of all petty cash.
</li>
<li>
Prepare a financial statement showing all receipts and payments during their term of office, for presentation with auditors report to the Annual General Meeting.
</li>
<li>
Produce and deliver all necessary books, vouchers and other documents to the persons appointed by the Guild Finance Committee for the purpose of conducting an audit, in so far as such persons may so require.
</li>
<li>
Prepare necessary forms, and receipts for Societies Council in accordance with Societies Council grant policies.
</li>
</ul>
</li>
</ol>
<h3 class='list-heading font-mono'>Deposits and Withdrawal of Monies</h3>
<ol role='list'>
<li>
All monies due and payable to the Club shall be received by the Treasurer who shall lodge them without undue delay with Guild Finance for the credit of the Club.
</li>
<li>
Any two members of the Executive may jointly sign cheques and forms of authority for the payment of funds of the Society.
</li>
<li>
Notwithstanding anything contained herein, no persons shall deposit or withdraw any monies into any account that Guild Council has closed by resolution.
</li>
</ol>
<h3 class='list-heading font-mono'>Payments</h3>
<ol role='list'>
<li>
No payments shall be made on behalf or in the name of the Club unless it has been authorised by the Executive Office Bearers, in accordance with Article 2.2
</li>
</ol>
<h3 class='list-heading font-mono'>Major Obligations to Guild</h3>
<ol role='list'>
<li>
The Club shall comply with the Regulation of the Guild, the Rules of the Societies Council, and all other provisions enrolled upon the Guild Statutes book.
</li>
<li>
All Office Bearers and committee members shall be jointly and severally responsible for such compliance, and shall be deemed liable in the event of noncompliance therewith.
</li>
</ol>
<h3 class='list-heading font-mono'>Expulsion of Members</h3>
<ol role='list'>
<li>
The Committee may by unanimous vote request any member or associate member to resign from the Club, and in the event shall cause written notification of such request to be served upon the member concerned.
</li>
<li>
Should such a request prove ineffectual after fourteen days of written notification, the Committee may serve written notice of intended expulsion of the member concerned and should they not have resigned seven days after, the Committee may by unanimous vote expel him or her from the Club; but such expulsion shall be subject to review at the next General Meeting with the member present and to be heard.
</li>
<li>
A person who has been expelled or has resigned their membership may not reapply for membership for the period of one year.
</li>
</ol>
<h3 class='list-heading font-mono'>Availability of Constitution</h3>
<ol role='list'>
<li>The Committee shall make this Constitution available on request to all Ordinary Members.</li>
</ol>
<h3 class='list-heading font-mono'>Interpretation</h3>
<ol role='list'>
<li>
Subject to any provisions enrolled upon the Guild Statutes book and to any resolution passed by Guild Council, or the Societies Council, the President shall have the power to interpret the meaning of any of the provisions contained in the Constitution, but the determining decision in case of doubt shall rest with the Club in General Meeting.
</li>
</ol>
<h3 class='list-heading font-mono'>Amendment of This Constitution</h3>
<ol role='list'>
<li>
Any two financial Ordinary Members of the Club may not less than three days before the day appointed for the next General Meeting submit to the Secretary a notice of motion signed by them proposing an alteration to this Constitution. This shall be posted on notice boards forthwith.
</li>
<li>
The motion may then be considered by the Club at its next meeting and amendments that are relevant to the subject matter thereof may be moved without notice.
</li>
<li>
The motion of any amendment thereto shall not be deemed adopted unless it receives a two-thirds majority of the members present and voting.
</li>
<li>
The motion as adopted with any amendments shall come into force upon receiving the approval of the Societies Council.
</li>
</ol>
<h3 class='list-heading font-mono'>Dissolution of the Club</h3>
<ol role='list'>
<li>
If upon the dissolution of the club, any property of the club remains after satisfaction of the debts and liabilities of the club that property shall be distributed to another association or club affiliated to the Societies Council which has similar objectives to those of the club, and which association shall be determined by resolution of the members.
</li>
</ol>
</div>

**Adopted by General Meeting - 20/03/2024**

`)
    .replace(/(<h1>.*<\/h1>)/, "")
    .replace(/<br \/>/, "")

  return (
    <DialogContent className="max-h-screen max-w-2xl overflow-hidden sm:max-h-[calc(95vh)]">
      <DialogHeader>
        <DialogTitle>Constitution of Coders for Causes</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[calc(100vh-84px)] w-full font-sans text-sm sm:h-[calc(95vh-84px)]">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ScrollArea>
    </DialogContent>
  )
}

export default ConstitutionModal
