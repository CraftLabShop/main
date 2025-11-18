# TODO: Implement Dynamic Currency Conversion

## Steps to Complete

1. **Update script.js**
   - Add currency detection using navigator.language
   - Create language to currency mapping (e.g., 'pl' -> 'PLN', 'en' -> 'USD')
   - Add function to fetch exchange rates from API (https://api.exchangerate-api.com/v4/latest/USD)
   - Create price conversion function
   - Update loadFeaturedProducts() to apply conversion
   - Add error handling for API failures

2. **Update combos.html**
   - Modify inline JS to use converted prices instead of hardcoded USD

3. **Update maps.html**
   - Modify inline JS to use converted prices instead of hardcoded USD

4. **Update datapacks.html**
   - Modify inline JS to use converted prices instead of hardcoded USD

5. **Update models.html**
   - Modify inline JS to use converted prices instead of hardcoded USD

6. **Test Implementation**
   - Change browser language to Polish and verify PLN prices
   - Check fallback to USD on API error
   - Verify prices update on all pages

7. **Monitor and Optimize**
   - Check API usage to avoid rate limits
   - Consider adding currency selector if needed

## Completed Steps

- [x] Update script.js: Added currency detection, mapping, API fetching, conversion functions, and updated loadFeaturedProducts()
- [x] Update combos.html: Modified inline JS to use converted prices
- [x] Update maps.html: Modified inline JS to use converted prices
- [x] Update datapacks.html: Modified inline JS to use converted prices
- [x] Update models.html: Modified inline JS to use converted prices
- [x] Add currency selector dropdown: Added dropdown menu in navigation with currency options (PLN, USD, EUR, etc.)
- [x] Update CSS for currency selector: Added styling for the currency dropdown menu
- [x] Implement localStorage for currency preference: Currency choice is saved and restored on page reload
- [x] Fix API issues: Changed to reliable exchangerate-api.com API
- [x] Fix duplicate products issue: Moved product loading to dedicated functions in script.js
- [x] Remove language-based auto-detection: Only use saved preference or manual selection
- [x] Remove flags from currency selector: Simplified to show only currency codes
