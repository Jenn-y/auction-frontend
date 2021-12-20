import { faCog, faGavel, faThList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import AuthService from 'services/AuthService';
import BidsSection from './BidsSection';
import ProfileSection from './ProfileSection';
import SellerSection from './SellerSection';
import SettingsSection from './SettingsSection';

import './MyAccount.scss';

const MyAccount = (props: any) => {
	const [user, setUser] = useState()
	const [showProfile, setShowProfile] = useState<boolean>()
	const [showSeller, setShowSeller] = useState<boolean>()
	const [showBids, setShowBids] = useState<boolean>()
	const [showSettings, setShowSettings] = useState<boolean>()

	useEffect(() => {
		setUser(AuthService.getCurrentUser())
		onButtonClick(props.match.params.section)
	}, [])
	
	const onButtonClick = (button: string) => {
		switch (button) {
			case "profile":
				setShowProfile(true)
				setShowSeller(false)
				setShowBids(false)
				setShowSettings(false)
				break;
			case "seller":
				setShowProfile(false)
				setShowSeller(true)
				setShowBids(false)
				setShowSettings(false)
				break;
			case "bids":
				setShowProfile(false)
				setShowSeller(false)
				setShowBids(true)
				setShowSettings(false)
				break;
			case "settings":
				setShowProfile(false)
				setShowSeller(false)
				setShowBids(false)
				setShowSettings(true)
				break;
		}
	}

    return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-sm-12 col-lg tabs">
					<button className={showProfile ? 'active' : ''} onClick={() => onButtonClick("profile")}>
						<FontAwesomeIcon icon={faUser} />Profile
					</button>
					<button className={showSeller ? 'active' : ''} onClick={() => onButtonClick("seller")}>
						<FontAwesomeIcon icon={faThList} />Seller
					</button>
					<button className={showBids ? 'active' : ''} onClick={() => onButtonClick("bids")}>
						<FontAwesomeIcon icon={faGavel} />Bids
					</button>
					<button className={showSettings ? 'active' : ''} onClick={() => onButtonClick("settings")}>
						<FontAwesomeIcon icon={faCog} />Settings
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-sm-12 col-lg section">
					{ showProfile ? <ProfileSection user={user} /> : ''}
					{ showSeller ? <SellerSection user={user} /> : ''}
					{ showBids ? <BidsSection user={user} /> : ''}
					{ showSettings ? <SettingsSection user={user} /> : ''}
				</div>
			</div>
		</div>
    );
}

export default MyAccount
