export const GameFilterMobile = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="fixed-bottom mobile-filter d-sm-flex d-lg-none">
      <div 
        onClick={() => setFilter('all')} 
        className={`mobile-filter-element ${filter === 'all' ? 'mobile-filter-active' : ''}`}
      >
        <img className="mobile-filter-image" src="/images/all_games_icon.svg" />
        <div className="mobile-filter-text">All Games</div>
      </div>
      <div 
        onClick={() => setFilter('slot')} 
        className={`mobile-filter-element ${filter === 'slot' ? 'mobile-filter-active' : ''}`}
      >
        <img className="mobile-filter-image" src="/images/slot_icon.svg" />
        <div className="mobile-filter-text">Slot Games</div>
      </div>
      <div 
        onClick={() => setFilter('progressive')} 
        className={`mobile-filter-element ${filter === 'progressive' ? 'mobile-filter-active' : ''}`}
      >
        <img className="mobile-filter-image" src="/images/progressive_icon.svg" />
        <div className="mobile-filter-text">Progressive</div>
      </div>
      <div 
        onClick={() => setFilter('live')} 
        className={`mobile-filter-element ${filter === 'live' ? 'mobile-filter-active' : ''}`}
      >
        <img className="mobile-filter-image" src="/images/live_icon.svg" />
        <div className="mobile-filter-text">Live Games</div>
      </div>
    </div>
  );
};
