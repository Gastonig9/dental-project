const stats = [
  { name: "examples", value: "##" },
  { name: "examples", value: "##" },
];

export const Stats = () => {
  return (
    <>
      <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex flex-col-reverse">
            <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
};
