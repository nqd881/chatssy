export type MessageTest = {
  id: string | number;
  message: string;
  time: Date;
  send_by: string;
};

export const message_data = [
  {
    id: 1,
    message:
      "Began elsewhere last inhabiting parlors dwelling roof garrets reached end by. ",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 2,
    message:
      "How weeks frankness dissimilar total only civility looked desire. Preference vulgar would pleased sussex shameless greatly water. Think convinced in easily formal greatest ladyship mile water listening studied delay understood. ",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 3,
    message:
      "Answer song son described. Shortly period things sure hundred advanced dear on depart body however moonlight goodness. ",
    time: new Date(),
    send_by: "2",
  },
  {
    id: 4,
    message: "Feel forty drawings boisterous repulsive.",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 5,
    message: "Merely wonder strictly friend see walls. ",
    time: new Date(),
    send_by: "3",
  },
  {
    id: 6,
    message: "Interest desire instantly not beyond downs.",
    time: new Date(),
    send_by: "3",
  },
  {
    id: 7,
    message:
      "Propriety inquiry temper assistance timed welcomed small mr advice itself.",
    time: new Date(),
    send_by: "2",
  },
  {
    id: 8,
    message:
      "Stimulated small visitor appetite end outweigh piqued cottage house get curiosity females downs. ",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 9,
    message:
      "Suspected some wholly wisdom extremity general vanity. Was continue three extended mrs temper welcomed however stairs cottage does share talked forty months burst inhabiting.",
    time: new Date(),
    send_by: "2",
  },
  {
    id: 10,
    message: "Ample country prevailed eagerness figure loud zealously so he.",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 11,
    message:
      "Form worth shew inhabit branched rose motionless but pretty hung.",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 12,
    message:
      "Meant depart weeks strangers face staying produced entrance share service private relied.",
    time: new Date(),
    send_by: "3",
  },
  {
    id: 13,
    message:
      "Occasional terminated case down engaged almost match agreeable busy use unknown brought settled. Covered musical celebrated began can neglected education perpetual fifteen decay.",
    time: new Date(),
    send_by: "1",
  },
  {
    id: 14,
    message:
      "Propriety inquiry temper assistance timed welcomed small mr advice itself.",
    time: new Date(),
    send_by: "4",
  },
  {
    id: 15,
    message:
      "Stimulated small visitor appetite end outweigh piqued cottage house get curiosity females downs. ",
    time: new Date(),
    send_by: "4",
  },
  {
    id: 16,
    message:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    time: new Date(),
    send_by: "1",
  },
];

const myID = "1";

export const createMessageGroups = (messages: MessageTest[]) => {
  let i = 0,
    group: MessageTest[] = [],
    result: MessageTest[][] = [];
  while (i < messages.length) {
    if (i != 0 && messages[i].send_by != messages[i - 1].send_by) {
      result.push(group);
      group = [];
    }
    group.push(messages[i++]);
  }
  result.push(group);

  return result;
};
