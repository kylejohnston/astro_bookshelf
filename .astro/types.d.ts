declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"book": {
"1493.md": {
	id: "1493.md";
  slug: "1493";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"1q84.md": {
	id: "1q84.md";
  slug: "1q84";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"21-lessons.md": {
	id: "21-lessons.md";
  slug: "21-lessons";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"a-grief-observed.md": {
	id: "a-grief-observed.md";
  slug: "a-grief-observed";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"acceptance.md": {
	id: "acceptance.md";
  slug: "acceptance";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"accidental-billionaires.md": {
	id: "accidental-billionaires.md";
  slug: "accidental-billionaires";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"agency.md": {
	id: "agency.md";
  slug: "agency";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"alchemy.md": {
	id: "alchemy.md";
  slug: "alchemy";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"all-the-kings-men.md": {
	id: "all-the-kings-men.md";
  slug: "all-the-kings-men";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"all-the-presidents-men.md": {
	id: "all-the-presidents-men.md";
  slug: "all-the-presidents-men";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"american-prometheus.md": {
	id: "american-prometheus.md";
  slug: "american-prometheus";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"an-immense-world.md": {
	id: "an-immense-world.md";
  slug: "an-immense-world";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"analog-in-digital-out.md": {
	id: "analog-in-digital-out.md";
  slug: "analog-in-digital-out";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"andromeda-strain.md": {
	id: "andromeda-strain.md";
  slug: "andromeda-strain";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"annihilation.md": {
	id: "annihilation.md";
  slug: "annihilation";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"anthem.md": {
	id: "anthem.md";
  slug: "anthem";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"art-of-looking-sideways.md": {
	id: "art-of-looking-sideways.md";
  slug: "art-of-looking-sideways";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"artemis.md": {
	id: "artemis.md";
  slug: "artemis";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"authority.md": {
	id: "authority.md";
  slug: "authority";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"axioms-end.md": {
	id: "axioms-end.md";
  slug: "axioms-end";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"bad-blood.md": {
	id: "bad-blood.md";
  slug: "bad-blood";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"bandwidth.md": {
	id: "bandwidth.md";
  slug: "bandwidth";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"based-on-a-true-story.md": {
	id: "based-on-a-true-story.md";
  slug: "based-on-a-true-story";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"being-mortal.md": {
	id: "being-mortal.md";
  slug: "being-mortal";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"blindsight.md": {
	id: "blindsight.md";
  slug: "blindsight";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"blood-meridian.md": {
	id: "blood-meridian.md";
  slug: "blood-meridian";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"bossypants.md": {
	id: "bossypants.md";
  slug: "bossypants";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"branding-in-five-and-a-half-steps.md": {
	id: "branding-in-five-and-a-half-steps.md";
  slug: "branding-in-five-and-a-half-steps";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"brave-new-world.md": {
	id: "brave-new-world.md";
  slug: "brave-new-world";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"build-brilliant-brands.md": {
	id: "build-brilliant-brands.md";
  slug: "build-brilliant-brands";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"building-a-second-brain.md": {
	id: "building-a-second-brain.md";
  slug: "building-a-second-brain";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"candy-house.md": {
	id: "candy-house.md";
  slug: "candy-house";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"checklist-manifesto.md": {
	id: "checklist-manifesto.md";
  slug: "checklist-manifesto";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"children-of-time.md": {
	id: "children-of-time.md";
  slug: "children-of-time";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"colorless-tsukuru-tazaki.md": {
	id: "colorless-tsukuru-tazaki.md";
  slug: "colorless-tsukuru-tazaki";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"continuous-discovery-habits.md": {
	id: "continuous-discovery-habits.md";
  slug: "continuous-discovery-habits";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"creative-quest.md": {
	id: "creative-quest.md";
  slug: "creative-quest";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"creative-selection.md": {
	id: "creative-selection.md";
  slug: "creative-selection";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"creative-superpowers.md": {
	id: "creative-superpowers.md";
  slug: "creative-superpowers";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"creative-thinking.md": {
	id: "creative-thinking.md";
  slug: "creative-thinking";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"creativity-inc.md": {
	id: "creativity-inc.md";
  slug: "creativity-inc";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"cryptonomicon.md": {
	id: "cryptonomicon.md";
  slug: "cryptonomicon";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"curious-case-of-benjamin-button.md": {
	id: "curious-case-of-benjamin-button.md";
  slug: "curious-case-of-benjamin-button";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dance-of-the-possible.md": {
	id: "dance-of-the-possible.md";
  slug: "dance-of-the-possible";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-intelligence.md": {
	id: "dark-intelligence.md";
  slug: "dark-intelligence";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-matter-and-the-dinosaurs.md": {
	id: "dark-matter-and-the-dinosaurs.md";
  slug: "dark-matter-and-the-dinosaurs";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-matter-and-trojan-horses.md": {
	id: "dark-matter-and-trojan-horses.md";
  slug: "dark-matter-and-trojan-horses";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-matter.md": {
	id: "dark-matter.md";
  slug: "dark-matter";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-money.md": {
	id: "dark-money.md";
  slug: "dark-money";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dark-places.md": {
	id: "dark-places.md";
  slug: "dark-places";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"dawn-of-everything.md": {
	id: "dawn-of-everything.md";
  slug: "dawn-of-everything";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"disrupted.md": {
	id: "disrupted.md";
  slug: "disrupted";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"doing-justice.md": {
	id: "doing-justice.md";
  slug: "doing-justice";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"educated.md": {
	id: "educated.md";
  slug: "educated";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"elephant-in-the-brain.md": {
	id: "elephant-in-the-brain.md";
  slug: "elephant-in-the-brain";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"empower.md": {
	id: "empower.md";
  slug: "empower";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"every-tools-a-hammer.md": {
	id: "every-tools-a-hammer.md";
  slug: "every-tools-a-hammer";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"exhalation.md": {
	id: "exhalation.md";
  slug: "exhalation";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"fifth-season.md": {
	id: "fifth-season.md";
  slug: "fifth-season";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"flow.md": {
	id: "flow.md";
  slug: "flow";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"foucaults-pendulum.md": {
	id: "foucaults-pendulum.md";
  slug: "foucaults-pendulum";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"four-thousand-weeks.md": {
	id: "four-thousand-weeks.md";
  slug: "four-thousand-weeks";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"great-gatsby.md": {
	id: "great-gatsby.md";
  slug: "great-gatsby";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"greenlights.md": {
	id: "greenlights.md";
  slug: "greenlights";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"gulp.md": {
	id: "gulp.md";
  slug: "gulp";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"hacking-independence.md": {
	id: "hacking-independence.md";
  slug: "hacking-independence";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"hatching-twittter.md": {
	id: "hatching-twittter.md";
  slug: "hatching-twittter";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"heavy.md": {
	id: "heavy.md";
  slug: "heavy";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"high-output-management.md": {
	id: "high-output-management.md";
  slug: "high-output-management";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"hollow-kingdom.md": {
	id: "hollow-kingdom.md";
  slug: "hollow-kingdom";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-google-works.md": {
	id: "how-google-works.md";
  slug: "how-google-works";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-high-we-go-in-the-dark.md": {
	id: "how-high-we-go-in-the-dark.md";
  slug: "how-high-we-go-in-the-dark";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-to-absurd-scientific-advice.md": {
	id: "how-to-absurd-scientific-advice.md";
  slug: "how-to-absurd-scientific-advice";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-to-be-an-artist.md": {
	id: "how-to-be-an-artist.md";
  slug: "how-to-be-an-artist";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-to-fail-at-almost-everything-and-still-win-big.md": {
	id: "how-to-fail-at-almost-everything-and-still-win-big.md";
  slug: "how-to-fail-at-almost-everything-and-still-win-big";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-to-write-one-song.md": {
	id: "how-to-write-one-song.md";
  slug: "how-to-write-one-song";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"how-to.md": {
	id: "how-to.md";
  slug: "how-to";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"hummingbird-salamander.md": {
	id: "hummingbird-salamander.md";
  slug: "hummingbird-salamander";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"idea-writers.md": {
	id: "idea-writers.md";
  slug: "idea-writers";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"in-praise-of-shadows.md": {
	id: "in-praise-of-shadows.md";
  slug: "in-praise-of-shadows";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"incognito.md": {
	id: "incognito.md";
  slug: "incognito";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"influence.md": {
	id: "influence.md";
  slug: "influence";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"inspired.md": {
	id: "inspired.md";
  slug: "inspired";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"interstellar.md": {
	id: "interstellar.md";
  slug: "interstellar";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"invention-of-nature.md": {
	id: "invention-of-nature.md";
  slug: "invention-of-nature";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"invisible-life-of-addie-larue.md": {
	id: "invisible-life-of-addie-larue.md";
  slug: "invisible-life-of-addie-larue";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"junior.md": {
	id: "junior.md";
  slug: "junior";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"jurassic-park.md": {
	id: "jurassic-park.md";
  slug: "jurassic-park";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"kaiju-preservation-society.md": {
	id: "kaiju-preservation-society.md";
  slug: "kaiju-preservation-society";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"kitchen-confidential.md": {
	id: "kitchen-confidential.md";
  slug: "kitchen-confidential";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"klara-and-the-sun.md": {
	id: "klara-and-the-sun.md";
  slug: "klara-and-the-sun";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"let-my-people-go-surfing.md": {
	id: "let-my-people-go-surfing.md";
  slug: "let-my-people-go-surfing";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"mademoiselle-coco-chanel.md": {
	id: "mademoiselle-coco-chanel.md";
  slug: "mademoiselle-coco-chanel";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"making-music.md": {
	id: "making-music.md";
  slug: "making-music";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"ministry-for-the-future.md": {
	id: "ministry-for-the-future.md";
  slug: "ministry-for-the-future";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"misbehaving.md": {
	id: "misbehaving.md";
  slug: "misbehaving";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"mo-meta-blues.md": {
	id: "mo-meta-blues.md";
  slug: "mo-meta-blues";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"moneyland.md": {
	id: "moneyland.md";
  slug: "moneyland";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"moonwalking-with-einstein.md": {
	id: "moonwalking-with-einstein.md";
  slug: "moonwalking-with-einstein";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"my-sister-the-serial-killer.md": {
	id: "my-sister-the-serial-killer.md";
  slug: "my-sister-the-serial-killer";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"neuromancer.md": {
	id: "neuromancer.md";
  slug: "neuromancer";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"never-let-me-go.md": {
	id: "never-let-me-go.md";
  slug: "never-let-me-go";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"never-split-the-difference.md": {
	id: "never-split-the-difference.md";
  slug: "never-split-the-difference";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"never-use-futura.md": {
	id: "never-use-futura.md";
  slug: "never-use-futura";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"norse-mythology.md": {
	id: "norse-mythology.md";
  slug: "norse-mythology";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"nothing-to-see-here.md": {
	id: "nothing-to-see-here.md";
  slug: "nothing-to-see-here";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"old-mans-war.md": {
	id: "old-mans-war.md";
  slug: "old-mans-war";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"once-upon-a-time-in-hollywood.md": {
	id: "once-upon-a-time-in-hollywood.md";
  slug: "once-upon-a-time-in-hollywood";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"other-minds.md": {
	id: "other-minds.md";
  slug: "other-minds";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"paid-attention.md": {
	id: "paid-attention.md";
  slug: "paid-attention";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"pandemic.md": {
	id: "pandemic.md";
  slug: "pandemic";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"passage-of-power.md": {
	id: "passage-of-power.md";
  slug: "passage-of-power";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"picture-this.md": {
	id: "picture-this.md";
  slug: "picture-this";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"poor-charlies-almanack.md": {
	id: "poor-charlies-almanack.md";
  slug: "poor-charlies-almanack";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"popisho.md": {
	id: "popisho.md";
  slug: "popisho";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"power-of-now.md": {
	id: "power-of-now.md";
  slug: "power-of-now";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"premonition.md": {
	id: "premonition.md";
  slug: "premonition";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"pretty-much-everything.md": {
	id: "pretty-much-everything.md";
  slug: "pretty-much-everything";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"pricing-design.md": {
	id: "pricing-design.md";
  slug: "pricing-design";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"race-matters.md": {
	id: "race-matters.md";
  slug: "race-matters";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"range.md": {
	id: "range.md";
  slug: "range";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"reinvention-in-middle-america.md": {
	id: "reinvention-in-middle-america.md";
  slug: "reinvention-in-middle-america";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"remains-of-the-day.md": {
	id: "remains-of-the-day.md";
  slug: "remains-of-the-day";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"rosemarys-baby.md": {
	id: "rosemarys-baby.md";
  slug: "rosemarys-baby";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"sapiens.md": {
	id: "sapiens.md";
  slug: "sapiens";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"say-nothing.md": {
	id: "say-nothing.md";
  slug: "say-nothing";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"sea-of-tranquility.md": {
	id: "sea-of-tranquility.md";
  slug: "sea-of-tranquility";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"seducing-strangers.md": {
	id: "seducing-strangers.md";
  slug: "seducing-strangers";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"seven-principles-of-making-marriage-work.md": {
	id: "seven-principles-of-making-marriage-work.md";
  slug: "seven-principles-of-making-marriage-work";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"seveneves.md": {
	id: "seveneves.md";
  slug: "seveneves";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"sharp-objects.md": {
	id: "sharp-objects.md";
  slug: "sharp-objects";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"shoe-dog.md": {
	id: "shoe-dog.md";
  slug: "shoe-dog";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"shortest-way-home.md": {
	id: "shortest-way-home.md";
  slug: "shortest-way-home";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"slaughterhouse-five.md": {
	id: "slaughterhouse-five.md";
  slug: "slaughterhouse-five";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"sparrow.md": {
	id: "sparrow.md";
  slug: "sparrow";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"start-where-you-are.md": {
	id: "start-where-you-are.md";
  slug: "start-where-you-are";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"station-eleven.md": {
	id: "station-eleven.md";
  slug: "station-eleven";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"stolen-focus.md": {
	id: "stolen-focus.md";
  slug: "stolen-focus";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"super-sad-true-love-story.md": {
	id: "super-sad-true-love-story.md";
  slug: "super-sad-true-love-story";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"talking-to-strangers.md": {
	id: "talking-to-strangers.md";
  slug: "talking-to-strangers";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"technique-for-producing-ideas.md": {
	id: "technique-for-producing-ideas.md";
  slug: "technique-for-producing-ideas";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"ten-arguments-for-deleting-your-social-media-accounts-right-now.md": {
	id: "ten-arguments-for-deleting-your-social-media-accounts-right-now.md";
  slug: "ten-arguments-for-deleting-your-social-media-accounts-right-now";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-big-leap.md": {
	id: "the-big-leap.md";
  slug: "the-big-leap";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-city-we-became.md": {
	id: "the-city-we-became.md";
  slug: "the-city-we-became";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-creative-act.md": {
	id: "the-creative-act.md";
  slug: "the-creative-act";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-end-of-the-world.md": {
	id: "the-end-of-the-world.md";
  slug: "the-end-of-the-world";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-fifth-risk.md": {
	id: "the-fifth-risk.md";
  slug: "the-fifth-risk";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-fire-next-time.md": {
	id: "the-fire-next-time.md";
  slug: "the-fire-next-time";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-ghost-map.md": {
	id: "the-ghost-map.md";
  slug: "the-ghost-map";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-girl-with-all-the-gifts.md": {
	id: "the-girl-with-all-the-gifts.md";
  slug: "the-girl-with-all-the-gifts";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-goldfinch.md": {
	id: "the-goldfinch.md";
  slug: "the-goldfinch";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-good-father.md": {
	id: "the-good-father.md";
  slug: "the-good-father";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-graveyard-book.md": {
	id: "the-graveyard-book.md";
  slug: "the-graveyard-book";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-handmaids-tale.md": {
	id: "the-handmaids-tale.md";
  slug: "the-handmaids-tale";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-inevitable.md": {
	id: "the-inevitable.md";
  slug: "the-inevitable";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-jungle-book.md": {
	id: "the-jungle-book.md";
  slug: "the-jungle-book";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-machine-stops.md": {
	id: "the-machine-stops.md";
  slug: "the-machine-stops";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-man-in-the-high-castle.md": {
	id: "the-man-in-the-high-castle.md";
  slug: "the-man-in-the-high-castle";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-martian.md": {
	id: "the-martian.md";
  slug: "the-martian";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-measure.md": {
	id: "the-measure.md";
  slug: "the-measure";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-mindbody-prescription.md": {
	id: "the-mindbody-prescription.md";
  slug: "the-mindbody-prescription";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-mountain-in-the-sea.md": {
	id: "the-mountain-in-the-sea.md";
  slug: "the-mountain-in-the-sea";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-obstacle-is-the-way.md": {
	id: "the-obstacle-is-the-way.md";
  slug: "the-obstacle-is-the-way";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-outlier.md": {
	id: "the-outlier.md";
  slug: "the-outlier";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-overstory.md": {
	id: "the-overstory.md";
  slug: "the-overstory";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-peripheral.md": {
	id: "the-peripheral.md";
  slug: "the-peripheral";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-power.md": {
	id: "the-power.md";
  slug: "the-power";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-righteous-mind.md": {
	id: "the-righteous-mind.md";
  slug: "the-righteous-mind";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-science-of-interstellar.md": {
	id: "the-science-of-interstellar.md";
  slug: "the-science-of-interstellar";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-spy-who-came-in-from-the-cold.md": {
	id: "the-spy-who-came-in-from-the-cold.md";
  slug: "the-spy-who-came-in-from-the-cold";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-topeka-school.md": {
	id: "the-topeka-school.md";
  slug: "the-topeka-school";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-untethered-soul.md": {
	id: "the-untethered-soul.md";
  slug: "the-untethered-soul";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-wizard-and-the-prophet.md": {
	id: "the-wizard-and-the-prophet.md";
  slug: "the-wizard-and-the-prophet";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"the-women-could-fly.md": {
	id: "the-women-could-fly.md";
  slug: "the-women-could-fly";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"they-call-me-supermensch.md": {
	id: "they-call-me-supermensch.md";
  slug: "they-call-me-supermensch";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"think-again.md": {
	id: "think-again.md";
  slug: "think-again";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"this-is-how-they-tell-me-the-wrold-ends.md": {
	id: "this-is-how-they-tell-me-the-wrold-ends.md";
  slug: "this-is-how-they-tell-me-the-wrold-ends";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"this-time-tomorrow.md": {
	id: "this-time-tomorrow.md";
  slug: "this-time-tomorrow";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"three-body-problem.md": {
	id: "three-body-problem.md";
  slug: "three-body-problem";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"time-travel-a-history.md": {
	id: "time-travel-a-history.md";
  slug: "time-travel-a-history";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"tokyo-vice.md": {
	id: "tokyo-vice.md";
  slug: "tokyo-vice";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"tomorrow-and-tomorrow-and-tomorrow.md": {
	id: "tomorrow-and-tomorrow-and-tomorrow.md";
  slug: "tomorrow-and-tomorrow-and-tomorrow";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"typhoid-mary.md": {
	id: "typhoid-mary.md";
  slug: "typhoid-mary";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"uncanny-valley.md": {
	id: "uncanny-valley.md";
  slug: "uncanny-valley";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"undoing-project.md": {
	id: "undoing-project.md";
  slug: "undoing-project";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"van-gogh-the-life.md": {
	id: "van-gogh-the-life.md";
  slug: "van-gogh-the-life";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"vicious.md": {
	id: "vicious.md";
  slug: "vicious";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"victoria-the-queen.md": {
	id: "victoria-the-queen.md";
  slug: "victoria-the-queen";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"visual-research.md": {
	id: "visual-research.md";
  slug: "visual-research";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"we-need-to-talk.md": {
	id: "we-need-to-talk.md";
  slug: "we-need-to-talk";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"what-i-talk-about-when-i-talk-about-running.md": {
	id: "what-i-talk-about-when-i-talk-about-running.md";
  slug: "what-i-talk-about-when-i-talk-about-running";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"when-breath-becomes-air.md": {
	id: "when-breath-becomes-air.md";
  slug: "when-breath-becomes-air";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"when-things-fall-apart.md": {
	id: "when-things-fall-apart.md";
  slug: "when-things-fall-apart";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"when-we-cease-to-understand-the-world.md": {
	id: "when-we-cease-to-understand-the-world.md";
  slug: "when-we-cease-to-understand-the-world";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"working.md": {
	id: "working.md";
  slug: "working";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"writing-down-the-bones.md": {
	id: "writing-down-the-bones.md";
  slug: "writing-down-the-bones";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"xx.md": {
	id: "xx.md";
  slug: "xx";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"yearbook.md": {
	id: "yearbook.md";
  slug: "yearbook";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"zen-and-the-art-of-motorcycle-maintenance.md": {
	id: "zen-and-the-art-of-motorcycle-maintenance.md";
  slug: "zen-and-the-art-of-motorcycle-maintenance";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
"zone-one.md": {
	id: "zone-one.md";
  slug: "zone-one";
  body: string;
  collection: "book";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
