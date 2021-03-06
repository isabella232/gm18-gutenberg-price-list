const {createElement} = wp.element;
const {registerBlockType} = wp.blocks;
const {InnerBlocks, RichText} = wp.editor;

import './price-list.scss';

registerBlockType( "gm18-gutenberg-price-list/price-list", {
    title: "Price List",
    description: "Price list/restaurant menu",
    icon: "media-text",
    category: "common",
    attributes: {
        name: {
            type: 'string',
            source: 'children',
            selector: 'h2',
        }
    },

    edit( props ) {
        function updateNameAttribute( newValue ) {
            props.setAttributes({
                name: newValue,
            });
        }

        return (
            <section className="price-list">
                <h2>
                    <RichText
                        value={ props.attributes.name }
                        placeholder={ 'List Name' }
                        keepPlaceholderOnFocus={ true }
                        formattingControls={ [] }
                        onChange={ updateNameAttribute }
                    />
                </h2>
                {/* Want to do allowedBlocks={ [] }, but that seems buggy - https://github.com/WordPress/gutenberg/issues/7763 */}
                <InnerBlocks template={[
                    [ 'gm18-gutenberg-price-list/price-list-category' ],
					[ 'core/separator' ],
                    [ 'gm18-gutenberg-price-list/price-list-category' ],
                ]} />
            </section>
        );
    },

    save( props ) {
        return (
            <section className="price-list">
				{ props.attributes.name && (
					<h2>
						<RichText.Content
							value={ props.attributes.name }
						/>
					</h2>
				) }
                <InnerBlocks.Content />
            </section>
        );
    }
});
